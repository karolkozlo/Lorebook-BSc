import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";

async function createUniverse(name, description, userID) {
    try {
        return await db.Universe.create({
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
};

async function findUserUniverses(userID) {
    try {
        const universes = db.Universe.findAll({
            attributes: ['id', 'name'],
            where: {
                User_id: userID
            }
        });
        return universes;
    } catch(err) {
        throw new NotFoundException("Universes for this user were not found");
    }
};

async function findUserUniverseList(userID) {
    try {
        const universes = await db.sequelize.query(`SELECT id, name, SUM(${'`count`'}) as elementCount FROM
        (SELECT u.id, u.name, u.description, count(c.id) as count
        FROM characters c
        RIGHT JOIN universes u ON c.Universe_id = u.id
        JOIN users us ON u.User_id = us.id
        WHERE us.id = :userID
        GROUP BY u.id
        UNION ALL
        SELECT u.id, u.name, u.description, count(l.id) as count
        FROM locations l
        RIGHT JOIN universes u ON l.Universe_id = u.id
        JOIN users us ON u.User_id = us.id
        WHERE us.id = :userID
        GROUP BY u.id
        UNION ALL
        SELECT u.id, u.name, u.description, count(e.id) as count
        FROM events e
        RIGHT JOIN universes u ON e.Universe_id = u.id
        JOIN users us ON u.User_id = us.id
        WHERE us.id = :userID
        GROUP BY u.id
        UNION ALL
        SELECT u.id, u.name, u.description, count(e.id) as count
        FROM entries e
        RIGHT JOIN categories c ON e.Category_id = c.id
        RIGHT JOIN universes u ON c.Universe_id = u.id
        JOIN users us ON u.User_id = us.id
        WHERE us.id = :userID
        GROUP BY u.id
        ) AS counts
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
        const modelKeys = Object.keys(db.Universe.getAttributes()).filter((key) => { return !['id', 'User_id'].includes(key); });
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

export {
    createUniverse,
    updateUniverse,
    findUniverse,
    findUserUniverses,
    findUserUniverseList,
    destroyUniverse
};