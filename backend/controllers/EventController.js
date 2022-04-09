import {
    createEvent,
    addEventToTimeline,
    updateEvent,
    findEvent,
    findUniverseEvents,
    searchEvents,
    findTimelineEvents,
    destroyEvent,
    destroyEventTimeline
} from "../services/EventService.js";
import { NotFoundException } from "../errors.js";

async function getEvent(req, res) {
    if (req.params.id === undefined)
        res.status(400).send({ message: "ID must be defined" });
    try {
        const event = await findEvent(req.params.id);
        res.status(200).json(event);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function getUniverseEvents(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
    }
    try {
        const events = await findUniverseEvents(req.params.universeID, parseInt(req.query.limit), parseInt(req.query.offset));
        res.status(200).json(events);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function getTimelineEvents(req, res) {
    if (req.params.timelineID === undefined) {
        res.status(400).send({ message: "timelineID must be defined" });
    }
    try {
        const events = await findTimelineEvents(req.params.timelineID, parseInt(req.query.limit), parseInt(req.query.offset));
        res.status(200).json(events);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function getSearchedEvents(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
    }
    try {
        let q = req.query.q;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        const events = await searchEvents(req.params.universeID, q, limit, offset);
        res.status(200).json(events);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function postEvent(req, res) {
    try {
        if (!req.body.date.year) {
            throw new Error("Invalid date: missing year");
        }
        if (!req.body.date.month) {
            throw new Error("Invalid date: missing month");
        }
        if (!req.body.date.day) {
            throw new Error("Invalid date: missing day");
        }
        const createdEvent = await createEvent(
            req.body.universeID,
            req.body.name,
            req.body.description,
            req.body.date
        );
        res.status(201).json(createdEvent);
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function postEventToTimeline(req, res) {
    try {
        await addEventToTimeline(req.body.eventID, req.body.timelineID);
        res.status(201).send("Added event to timeline");
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function deleteEvent(req, res) {
    try {
        await destroyEvent(req.params.id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function deleteEventFromTimeline(req, res) {
    try {
        await destroyEventTimeline(req.params.timelineID, req.params.eventID);
        res.status(200).send();
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function patchEvent(req, res) {
    try {
        const id = req.params.id;
        await updateEvent(id, req.body);
        res.status(200).send();
    } catch (e) {
        if (e instanceof NotFoundException) {
            res.status(404);
        } else {
            res.status(400);
        }
        res.send({ message: e.message });
    }
}

export {
    getEvent,
    getUniverseEvents,
    getTimelineEvents,
    getSearchedEvents,
    postEvent,
    postEventToTimeline,
    deleteEvent,
    deleteEventFromTimeline,
    patchEvent
};