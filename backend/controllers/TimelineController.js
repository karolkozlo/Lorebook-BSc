import {
    createTimeline,
    findTimeline,
    findUniverseTimelines,
    updateTimeline,
    destroyTimeline,
} from "../services/TimelineService.js";
import { NotFoundException } from "../errors.js";

async function getTimeline(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const timeline = await findTimeline(req.params.id);
      res.status(200).json(timeline);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getUniverseTimelines(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
    }
    try {
      const timelines = await findUniverseTimelines(req.params.universeID);
      res.status(200).json(timelines);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postTimeline(req, res) {
    try {
      const createdTimeline = await createTimeline(
        req.body.title,
        req.body.universeID
      );
      res.status(201).json(createdTimeline);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteTimeline(req, res) {
    try {
      await destroyTimeline(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchTimeline(req, res) {
    try {
      await updateTimeline(req.params.id, req.body.title);
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

  export { getTimeline, getUniverseTimelines, postTimeline, deleteTimeline, patchTimeline };