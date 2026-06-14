import { postTimeline, patchTimeline, getTimeline, getUniverseTimelines, deleteTimeline }
from "../controllers/TimelineController.js";
import express from "express";

const TimelineRouter = new express.Router();
TimelineRouter.use(express.json());

TimelineRouter.route('/timelines').post(postTimeline);
TimelineRouter.route('/timelines/:id').get(getTimeline);
TimelineRouter.route('/timelines/universe/:universeID').get(getUniverseTimelines);
TimelineRouter.route('/timelines/:id').delete(deleteTimeline);
TimelineRouter.route('/timelines/:id').patch(patchTimeline);

export default TimelineRouter;