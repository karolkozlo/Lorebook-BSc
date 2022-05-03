import {
    createCharacter,
    findCharacter,
    findUniverseCharacters,
    searchCharacters,
    updateCharacter,
    destroyCharacter,
} from "../services/CharacterService.js";
import { NotFoundException } from "../errors.js";

async function getCharacter(req, res) {
    if (req.params.id === undefined) {
      res.status(400).send({ message: "ID must be defined" });
      return;
    }
    try {
      const Character = await findCharacter(req.params.id);
      res.status(200).json(Character);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getUniverseCharacters(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
        return;
    }
    try {
      const Characters = await findUniverseCharacters(req.params.universeID, parseInt(req.query.limit), parseInt(req.query.offset));
      res.status(200).json(Characters);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getSearchedCharacters(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
        return;
    }
    try {
      let q = req.query.q;
      let limit = parseInt(req.query.limit);
      let offset = parseInt(req.query.offset);
      const Characters = await searchCharacters(req.params.universeID, q, limit, offset);
      res.status(200).json(Characters);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postCharacter(req, res) {
    try {
      const createdCharacter = await createCharacter(
        req.body.name,
        req.body.description,
        req.body.universeID
      );
      res.status(201).json(createdCharacter);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteCharacter(req, res) {
    try {
      await destroyCharacter(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchCharacter(req, res) {
    try {
      const id = req.params.id;
      await updateCharacter(id, req.body);
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

  export { getCharacter, getUniverseCharacters, getSearchedCharacters, postCharacter, deleteCharacter, patchCharacter };