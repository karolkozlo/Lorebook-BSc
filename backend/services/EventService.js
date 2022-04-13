import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { Sequelize, QueryTypes } from "sequelize";
import { currentDateTimetoIsoString } from "./utils.js";
import { createContent } from "./ContentService.js";

function checkEventDate(year, m, d) {
    if (m < 1 || m > 12) {
        return false;
    }
    if (d < 1 || d > 31) {
        return false;
    }
    if (m == 2) {
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            return (d <= 29);
        }
        else {
            return (d <= 28);
        }
    }
    if (m == 4 || m == 6 || m == 9 || m == 11) {
            return (d <= 30);
    }
    return true;
}

async function createEvent(universeID, name, description, date) {
    let lastModified = currentDateTimetoIsoString();
    try {
        if(!checkEventDate(date.year, date.month, date.day)) {
            throw new Error("Date for event is invalid!");
        }
        let event = await db.Event.create({
            name: name,
            description: description,
            last_modified: lastModified,
            year: date.year,
            month: date.month,
            day: date.day,
            Universe_id: universeID
        });
        await createContent(event.getDataValue("id"), "Event");
        return event;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function addEventToTimeline(eventID, timelineID) {
    try {
        const event = await db.Event.findByPk(eventID);
        await db.Timeline.findByPk(timelineID).then(async (timeline) => {
            await timeline.addEvent(event);
        });
    } catch(err) {
        throw new Error(err.message);
    }
}

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
};

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
        const events = await db.Event.findAll({
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

async function destroyEventTimeline(timelineID, eventID) {
    try {
        await db.TimelineEvent.destroy({
          where: {
              Timeline_id: timelineID,
              Event_id: eventID
          },
        });
      } catch (err) {
        throw new Error(err.message);
      }
}

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
        if(subsetFields.year && subsetFields.month && subsetFields.day) {
            if(!checkEventDate(subsetFields.year, subsetFields.month, subsetFields.day)) {
                throw new Error("Date for event is invalid!");
            }
        }
        await db.Event.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
};

export {
    createEvent,
    addEventToTimeline,
    updateEvent,
    findEvent,
    findUniverseEvents,
    searchEvents,
    findTimelineEvents,
    destroyEvent,
    destroyEventTimeline
 };