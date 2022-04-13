import { postText, patchText, getText, getContentTexts, deleteText }
from "../controllers/TextController.js";
import express from "express";

const TextRouter = new express.Router();
TextRouter.use(express.json());

TextRouter.route('/texts').post(postText);
TextRouter.route('/texts/:id').get(getText);
TextRouter.route('/texts/content/:contentID').get(getContentTexts);
TextRouter.route('/texts/:id/content/:contentID').delete(deleteText);
TextRouter.route('/texts/:id/content/:contentID').patch(patchText);

export default TextRouter;