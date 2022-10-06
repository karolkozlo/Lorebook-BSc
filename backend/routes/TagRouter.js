import {
    getTag,
    getUniverseTags,
    getContentTags,
    getSearchedTags,
    getSearchedTagList,
    postTag,
    postTagToContent,
    deleteTag,
    deleteTagFromContent,
    patchTag }
from "../controllers/TagController.js";
import express from "express";

const TagRouter = new express.Router();
TagRouter.use(express.json());

TagRouter.route('/tags').post(postTag);
TagRouter.route('/tags/content').post(postTagToContent);
TagRouter.route('/tags/:id').get(getTag);
TagRouter.route('/tags/universe/:universeID').get(getUniverseTags);
TagRouter.route('/tags/content/:contentID').get(getContentTags);
TagRouter.route('/tags/search/:universeID').get(getSearchedTags);
TagRouter.route('/tags/search/list/:universeID').get(getSearchedTagList);
TagRouter.route('/tags/:id').delete(deleteTag);
TagRouter.route('/tags/:id/content/:contentID').delete(deleteTagFromContent);
TagRouter.route('/tags/:id').patch(patchTag);

export default TagRouter;