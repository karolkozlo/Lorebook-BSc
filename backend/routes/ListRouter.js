import { postList, patchList, getList, getContentLists, deleteList }
from "../controllers/ListController.js";
import express from "express";

const ListRouter = new express.Router();
ListRouter.use(express.json());

ListRouter.route('/lists').post(postList);
ListRouter.route('/lists/:id').get(getList);
ListRouter.route('/lists/content/:contentID').get(getContentLists);
ListRouter.route('/lists/:id/content/:contentID').delete(deleteList);
ListRouter.route('/lists/:id/content/:contentID').patch(patchList);

export default ListRouter;