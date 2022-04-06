import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";

async function createTimeline(title, universeID) {
    try {
        let timeline = await db.Timeline.create({
            title: title,
            Universe_id: universeID
        });
        return timeline;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findTimeline(id) {
    try {
        const timeline = db.Timeline.findOne({
            where: {
                id: id
            }
        });
        return timeline;
    } catch(err) {
        throw new NotFoundException("Timeline not found");
    }
};

async function findUniverseTimelines(universeID) {
    try {
        const timelines = db.Timeline.findAll({
            where: {
                Universe_id: universeID,
            },
        });
        return timelines;
    } catch(err) {
        throw new NotFoundException("Timelines for this universe were not found");
    }
};

async function destroyTimeline(id) {
    try {
        await db.Timeline.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateTimeline(id, title) {
    try {
        let subsetFields = {};
        subsetFields.title = title;
        await db.Timeline.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
};

export { createTimeline, updateTimeline, findTimeline, findUniverseTimelines, destroyTimeline };