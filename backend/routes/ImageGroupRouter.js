import { postImageGroup, patchImageGroup, getImageGroup, getContentImageGroups, deleteImageGroup }
from "../controllers/ImageGroupController.js";
import express from "express";

const ImageGroupRouter = new express.Router();
ImageGroupRouter.use(express.json());

ImageGroupRouter.route('/image_groups').post(postImageGroup);
ImageGroupRouter.route('/image_groups/:id').get(getImageGroup);
ImageGroupRouter.route('/image_groups/content/:contentID').get(getContentImageGroups);
ImageGroupRouter.route('/image_groups/:id/content/:contentID').delete(deleteImageGroup);
ImageGroupRouter.route('/image_groups/:id/content/:contentID').patch(patchImageGroup);

export default ImageGroupRouter;