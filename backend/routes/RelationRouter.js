import { postRelation, patchRelation, getRelation, getCharacterRelations, deleteRelation }
from "../controllers/RelationController.js";
import express from "express";

const RelationRouter = new express.Router();
RelationRouter.use(express.json());

RelationRouter.route('/relations').post(postRelation);
RelationRouter.route('/relations/:id').get(getRelation);
RelationRouter.route('/relations/character/:characterID').get(getCharacterRelations);
RelationRouter.route('/relations/:id').delete(deleteRelation);
RelationRouter.route('/relations/:id').patch(patchRelation);

export default RelationRouter;