import {
    createRelation,
    findRelation,
    findCharacterRelations,
    updateRelation,
    destroyRelation,
} from "../services/RelationService.js";
import { NotFoundException } from "../errors.js";

async function getRelation(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const Relation = await findRelation(req.params.id);
      res.status(200).json(Relation);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getCharacterRelations(req, res) {
    if (req.params.characterID === undefined) {
        res.status(400).send({ message: "CharacterID must be defined" });
    }
    try {
      const Relations = await findCharacterRelations(req.params.characterID, parseInt(req.query.limit), parseInt(req.query.offset));
      res.status(200).json(Relations);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postRelation(req, res) {
    try {
      const createdRelation = await createRelation(
        req.body.level,
        req.body.description,
        req.body.Character1ID,
        req.body.Character2ID
      );
      res.status(201).json(createdRelation);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteRelation(req, res) {
    try {
      await destroyRelation(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchRelation(req, res) {
    try {
      const id = req.params.id;
      await updateRelation(id, req.body);
      res.status(200).send();
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.status(404);
      } else {
        res.status(400);
      }
      res.send({ message: e.message });
    }
  }

  export { getRelation, getCharacterRelations, postRelation, deleteRelation, patchRelation };