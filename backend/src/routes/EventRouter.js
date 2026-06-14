import {
    getEvent,
    getUniverseEvents,
    getTimelineEvents,
    getSearchedEvents,
    postEvent,
    postEventToTimeline,
    deleteEvent,
    deleteEventFromTimeline,
    patchEvent
} from "../controllers/EventController.js";
import express from "express";

const EventRouter = new express.Router();
EventRouter.use(express.json());

EventRouter.route('/events').post(postEvent);
EventRouter.route('/events/timeline').post(postEventToTimeline);
EventRouter.route('/events/:id').get(getEvent);
EventRouter.route('/events/universe/:universeID').get(getUniverseEvents);
EventRouter.route('/events/timeline/:timelineID').get(getTimelineEvents);
EventRouter.route('/events/search/:universeID').get(getSearchedEvents);
EventRouter.route('/events/:id').delete(deleteEvent);
EventRouter.route('/events/:eventID/timeline/:timelineID').delete(deleteEventFromTimeline);
EventRouter.route('/events/:id').patch(patchEvent);

export default EventRouter;