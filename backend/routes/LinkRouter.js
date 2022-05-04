import {
    getLink,
    getChapterLinks,
    getGroupLinks,
    getLinksTo,
    postLink,
    deleteLink,
    patchLink
} from "../controllers/LinkController.js";
import express from "express";

const LinkRouter = new express.Router();
LinkRouter.use(express.json());

LinkRouter.route('/links').post(postLink);
LinkRouter.route('/links/:id').get(getLink);
LinkRouter.route('/links/chapter/:chapterID').get(getChapterLinks);
LinkRouter.route('/links/link_group/:linkGroupID').get(getGroupLinks);
LinkRouter.route('/links/to/:targetType/:targetID').get(getLinksTo);
LinkRouter.route('/links/:id').delete(deleteLink);
LinkRouter.route('/links/:id/content/:contentID').delete(deleteLink);
LinkRouter.route('/links/:id/content/:contentID').patch(patchLink);

export default LinkRouter;