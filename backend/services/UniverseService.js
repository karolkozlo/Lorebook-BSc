import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";

async function createUniverse(name, description, userID) {
    try {
        db.Universe.create({
            name: name,
            description: description,
            User_id: userID
        });
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findUniverse(id) {
    try {
        const universe = db.Universe.findOne({
            where: {
                id: id
            }
        });
        return universe;
    } catch(err) {
        throw new NotFoundException("Universe not found");
    }
}

async function findUserUniverses(userID) {
    try {
        const universes = await db.sequelize.query(`SELECT id, name, description,  SUM('count') as elementCount FROM
        (SELECT u.id, u.name, u.description, count(c.id) as count
        FROM characters c
        JOIN universes u ON c.Universe_id = u.id
        JOIN users us ON u.User_id = us.id
        WHERE us.id = :userID
        GROUP BY u.id
        UNION ALL
        SELECT u.id, u.name, u.description, count(l.id) as count
        FROM locations l JOIN universes u ON l.Universe_id = u.id
        JOIN users us ON u.User_id = us.id
        WHERE us.id = :userID
        GROUP BY u.id
        UNION ALL
        SELECT u.id, u.name, u.description, count(e.id) as count
        FROM events e JOIN universes u ON e.Universe_id = u.id
        JOIN users us ON u.User_id = us.id
        WHERE us.id = :userID
        GROUP BY u.id
        UNION ALL
        SELECT u.id, u.name, u.description, count(e.id) as count
        FROM entries e
        JOIN categories c ON e.Category_id = c.id
        JOIN universes u ON c.Universe_id = u.id
        JOIN users us ON u.User_id = us.id
        WHERE us.id = :userID
        GROUP BY u.id
        ) AS universeElements
        GROUP BY id;`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: {
                userID: userID
            }
        });
        return universes;
    } catch(err) {
        throw new NotFoundException("Universes for this user were not found");
    }
};

async function destroyUniverse(id) {
    try {
        await db.Universe.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
}

async function updateUniverse(id, updatedFields) {
    try {
        const modelKeys = Object.keys(db.Universe.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});
        await db.Universe.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
}

export { createUniverse, updateUniverse, findUniverse, findUserUniverses, destroyUniverse };