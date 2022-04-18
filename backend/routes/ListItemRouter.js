import { postListItem, patchListItem, patchListItemPosition, getListItem, getListItems, deleteListItem }
from "../controllers/ListItemController.js";
import express from "express";

const ListItemRouter = new express.Router();
ListItemRouter.use(express.json());

ListItemRouter.route('/list_items').post(postListItem);
ListItemRouter.route('/list_items/:id').get(getListItem);
ListItemRouter.route('/list_items/list/:listID').get(getListItems);
ListItemRouter.route('/list_items/:id/content/:contentID').delete(deleteListItem);
ListItemRouter.route('/list_items/:id/content/:contentID').patch(patchListItem);
ListItemRouter.route('/list_items/position/:id/content/:contentID').patch(patchListItemPosition);


export default ListItemRouter;