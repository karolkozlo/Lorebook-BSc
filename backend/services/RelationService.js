import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { UniqueConstraintError } from 'sequelize';

async function createRelation(level, description, character1ID, character2ID) {
    let levelNumb = parseInt(level);
    if(isNaN(levelNumb)) {
        throw new Error("Level of relation should be a number");
    }
    try {
        let relation = null;
        relation = await db.Relation.create({
            level: levelNumb,
            description: description,
            Character1_id: character1ID,
            Character2_id: character2ID,
        });
        return relation;
    } catch(err) {
        if(err instanceof UniqueConstraintError) {
            throw new Error("Relation already exists");
        }
        throw new Error(err.message);
    }
};

async function findRelation(id) {
    try {
        const Relation = db.Relation.findOne({
            where: {
                id: id
            }
        });
        return Relation;
    } catch(err) {
        throw new NotFoundException("Relation not found");
    }
};

async function findCharacterRelations(character1ID, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    try {
        const Relations = db.Relation.findAll({
            where: {
                Character1_id: character1ID,
            },
            offset: findOffset,
            limit: findLimit
        });
        return Relations;
    } catch(err) {
        throw new NotFoundException("Relations for this User were not found");
    }
};

async function destroyRelation(id) {
    try {
        await db.Relation.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(e.message);
      }
};

async function updateRelation(id, updatedFields) {
    try {
        const modelKeys = Object.keys(db.Relation.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});
        await db.Relation.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(e.message);
    }
};

export { createRelation, updateRelation, findRelation, findCharacterRelations, destroyRelation };