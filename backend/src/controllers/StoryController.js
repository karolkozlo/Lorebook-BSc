import {
    createStory,
    findStory,
    findUniverseStories,
    findUniverseStoryList,
    updateStory,
    destroyStory,
} from "../services/StoryService.js";
import { NotFoundException } from "../errors.js";

async function getStory(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const story = await findStory(req.params.id);
      res.status(200).json(story);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getUniverseStories(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
    }
    try {
      const stories = await findUniverseStories(req.params.universeID, parseInt(req.query.limit), parseInt(req.query.offset));
      res.status(200).json(stories);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getUniverseStoryList(req, res) {
  if (req.params.universeID === undefined) {
    res.status(400).send({ message: "universeID must be defined" });
    return;
  }
  try {
    const storyList = await findUniverseStoryList(req.params.universeID);
    res.status(200).json(storyList);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

async function postStory(req, res) {
    try {
      const createdStory = await createStory(
        req.body.title,
        req.body.description,
        req.body.universeID
      );
      res.status(201).json(createdStory);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteStory(req, res) {
    try {
      await destroyStory(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchStory(req, res) {
    try {
      const id = req.params.id;
      await updateStory(id, req.body);
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
  getStory,
  getUniverseStories,
  getUniverseStoryList,
  postStory,
  deleteStory,
  patchStory
};