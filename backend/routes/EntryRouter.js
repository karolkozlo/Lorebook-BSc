import { postEntry, patchEntry, getEntry, getCategoryEntries, getSearchedEntries, deleteEntry }
from "../controllers/EntryController.js";
import express from "express";

const EntryRouter = new express.Router();
EntryRouter.use(express.json());

EntryRouter.route('/entries').post(postEntry);
EntryRouter.route('/entries/:id').get(getEntry);
EntryRouter.route('/entries/category/:categoryID').get(getCategoryEntries);
EntryRouter.route('/entries/search/:categoryID').get(getSearchedEntries);
EntryRouter.route('/entries/:id').delete(deleteEntry);
EntryRouter.route('/entries/:id').patch(patchEntry);

export default EntryRouter;