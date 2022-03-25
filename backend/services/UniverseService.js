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
        const universes = db.Universe.findAll({
            where: {
                User_id: userID
            }
        });
        return universes;
    } catch(err) {
        throw new NotFoundException("Universes for this user were not found");
    }
}

async function destroyUniverse(id) {
    try {
        await db.Universe.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(e.message);
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
        throw new Error(e.message);
    }
}

export { createUniverse, updateUniverse, findUniverse, findUserUniverses, destroyUniverse };