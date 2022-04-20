import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";

async function createStory(title, description, universeID) {
    try {
        let story = await db.Story.create({
            title: title,
            description: description,
            Universe_id: universeID
        });
        return story;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findStory(id) {
    try {
        const story = db.Story.findOne({
            where: {
                id: id
            }
        });
        return story;
    } catch(err) {
        throw new NotFoundException("Story not found");
    }
};

async function findUniverseStories(universeID) {
    try {
        const stories = db.Story.findAll({
            where: {
                Universe_id: universeID,
            },
        });
        return stories;
    } catch(err) {
        throw new NotFoundException("Stories for this Universe were not found");
    }
};

async function destroyStory(id) {
    try {
        await db.Story.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateStory(id, updatedFields) {
    try {
        const modelKeys = Object.keys(db.Story.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});
        await db.Story.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
};

export { createStory, updateStory, findStory, findUniverseStories, destroyStory };