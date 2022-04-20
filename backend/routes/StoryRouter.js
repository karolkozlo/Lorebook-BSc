import { postStory, patchStory, getStory, getUniverseStories, deleteStory }
from "../controllers/StoryController.js";
import express from "express";

const StoryRouter = new express.Router();
StoryRouter.use(express.json());

StoryRouter.route('/stories').post(postStory);
StoryRouter.route('/stories/:id').get(getStory);
StoryRouter.route('/stories/universe/:universeID').get(getUniverseStories);
StoryRouter.route('/stories/:id').delete(deleteStory);
StoryRouter.route('/stories/:id').patch(patchStory);

export default StoryRouter;