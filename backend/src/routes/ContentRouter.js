import { getFullContent, patchContentConfig }
from "../controllers/ContentController.js";
import express from "express";

const ContentRouter = new express.Router();
ContentRouter.use(express.json());

ContentRouter.route('/contents/:type/:ownerID').get(getFullContent);
ContentRouter.route('/contents/:contentID').patch(patchContentConfig);

export default ContentRouter;