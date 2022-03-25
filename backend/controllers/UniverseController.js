import {
    createUniverse,
    findUniverse,
    findUserUniverses,
    updateUniverse,
    destroyUniverse,
} from "../services/UniverseService.js";
import { NotFoundException } from "../errors.js";

async function getUniverse(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const Universe = await findUniverse(req.params.id);
      res.status(200).json(Universe);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getUserUniverses(req, res) {
    if (req.params.userID === undefined)
      res.status(400).send({ message: "userID must be defined" });
    try {
      const Universes = await findUserUniverses(req.params.userID);
      res.status(200).json(Universes);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postUniverse(req, res) {
    try {
      const createdUniverse = await createUniverse(
        req.body.name,
        req.body.description,
        req.body.userID
      );
      res.status(201).json(createdUniverse);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteUniverse(req, res) {
    try {
      await destroyUniverse(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchUniverse(req, res) {
    try {
      const id = req.params.id;
      await updateUniverse(id, req.body);
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

  export { getUniverse, getUserUniverses, postUniverse, deleteUniverse, patchUniverse };