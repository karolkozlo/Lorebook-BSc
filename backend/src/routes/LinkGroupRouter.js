import { postLinkGroup, patchLinkGroup, getLinkGroup, getContentLinkGroups, deleteLinkGroup }
from "../controllers/LinkGroupController.js";
import express from "express";

const LinkGroupRouter = new express.Router();
LinkGroupRouter.use(express.json());

LinkGroupRouter.route('/link_groups').post(postLinkGroup);
LinkGroupRouter.route('/link_groups/:id').get(getLinkGroup);
LinkGroupRouter.route('/link_groups/content/:contentID').get(getContentLinkGroups);
LinkGroupRouter.route('/link_groups/:id/content/:contentID').delete(deleteLinkGroup);
LinkGroupRouter.route('/link_groups/:id/content/:contentID').patch(patchLinkGroup);

export default LinkGroupRouter;