import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { Sequelize, QueryTypes } from "sequelize";
import { currentDateTimetoIsoString } from "./utils.js";

/*async function createEvent(name, description, date) {
    let lastModified = currentDateTimetoIsoString();
    try {
        db.Event.create({
            name: name,
            description: description,
            last_modified: lastModified,
            year: date.year,
            month: date.month,
            day: date.day
        });
    } catch(err) {
        throw new Error(err.message);
    }
};*/

async function findEvent(id) {
    try {
        const event = db.Event.findOne({
            where: {
                id: id
            }
        });
        return event;
    } catch(err) {
        throw new NotFoundException("Event not found");
    }
};

/*
async function findUniverseEvents(universeID, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    try {
        const events = db.Event.findAll({
            where: {
                Universe_id: universeID,
            },
            offset: findOffset,
            limit: findLimit,
            order: [['last_modified', 'DESC']]
        });
        return events;
    } catch(err) {
        throw new NotFoundException("Events for this universe were not found");
    }
};*/

async function findTimelineEvents(timelineID, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    try {
        const events = await db.sequelize.query(`SELECT e.id, e.name, e.description, e.year, e.month, e.day, e.last_modified
        FROM events AS e INNER JOIN timeline_event AS te ON e.id = te.Event_id AND te.Timeline_id = 1
        ORDER BY year ASC, month ASC, day ASC
        LIMIT :limit
        OFFSET :offset;`,
        {
            type: QueryTypes.SELECT,
            replacements: {
                timelineID: timelineID,
                limit: findLimit,
                offset: findOffset
            }
        });
        return events;
    } catch(err) {
        console.log(err.message);
        throw new NotFoundException("Events for this timeline were not found");
    }
}

/*
async function searchEvents(universeID, expr, limit, offset) {
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
        const events = db.Event.findAll({
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
        return events;
    } catch(err) {
        throw new Error(err.message);
    }
}
*/

async function destroyEvent(id) {
    try {
        await db.Event.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateEvent(id, updatedFields) {
    let lastModified = currentDateTimetoIsoString();
    try {
        const modelKeys = Object.keys(db.Event.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});
        subsetFields.last_modified = lastModified;
        await db.Event.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
};

export { /*createEvent,*/ updateEvent, findEvent, /*findUniverseEvents,*/ /*searchEvents,*/findTimelineEvents, destroyEvent };