import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { Sequelize } from "sequelize";
import { currentDateTimetoIsoString } from "./utils.js";

async function createCharacter(name, description, universeID) {
    let lastModified = currentDateTimetoIsoString();
    try {
        db.Character.create({
            name: name,
            description: description,
            last_modified: lastModified,
            Universe_id: universeID
        });
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findCharacter(id) {
    try {
        const Character = db.Character.findOne({
            where: {
                id: id
            }
        });
        return Character;
    } catch(err) {
        throw new NotFoundException("Character not found");
    }
};

async function findUniverseCharacters(universeID, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    try {
        const Characters = db.Character.findAll({
            where: {
                Universe_id: universeID,
            },
            offset: findOffset,
            limit: findLimit,
            order: [['last_modified', 'DESC']]
        });
        return Characters;
    } catch(err) {
        throw new NotFoundException("Characters for this universe were not found");
    }
};

async function searchCharacters(universeID, expr, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    let searchLike = '.*'+expr+'.*';
    let Op = Sequelize.Op;
    try {
        const Characters = db.Character.findAll({
            where: {
                [Op.and]: [
                    {Universe_id: universeID},
                    {name: {
                        [Op.regexp]: searchLike
                    }}
                ]
            },
            offset: findOffset,
            limit: findLimit,
            order: [['last_modified', 'DESC']]
        });
        return Characters;
    } catch(err) {
        throw new Error(err.message);
    }
}

async function destroyCharacter(id) {
    try {
        await db.Character.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateCharacter(id, updatedFields) {
    let lastModified = currentDateTimetoIsoString();
    try {
        const modelKeys = Object.keys(db.Character.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});
        subsetFields.last_modified = lastModified;
        await db.Character.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
};

export { createCharacter, updateCharacter, findCharacter, findUniverseCharacters, searchCharacters, destroyCharacter };