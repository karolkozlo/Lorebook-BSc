import {
    createEntry,
    findEntry,
    findCategoryEntries,
    searchEntries,
    updateEntry,
    destroyEntry,
} from "../services/EntryService.js";
import { NotFoundException } from "../errors.js";

async function getEntry(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const entry = await findEntry(req.params.id);
      res.status(200).json(entry);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getCategoryEntries(req, res) {
    if (req.params.categoryID === undefined) {
        res.status(400).send({ message: "categoryID must be defined" });
    }
    try {
      const entries = await findCategoryEntries(req.params.categoryID, parseInt(req.query.limit), parseInt(req.query.offset));
      res.status(200).json(entries);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getSearchedEntries(req, res) {
    if (req.params.categoryID === undefined) {
        res.status(400).send({ message: "categoryID must be defined" });
    }
    try {
      let q = req.query.q;
      let limit = parseInt(req.query.limit);
      let offset = parseInt(req.query.offset);
      const entries = await searchEntries(req.params.categoryID, q, limit, offset);
      res.status(200).json(entries);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postEntry(req, res) {
    try {
      const createdEntry = await createEntry(
        req.body.name,
        req.body.description,
        req.body.categoryID
      );
      res.status(201).json(createdEntry);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteEntry(req, res) {
    try {
      await destroyEntry(req.params.id);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchEntry(req, res) {
    try {
      const id = req.params.id;
      await updateEntry(id, req.body);
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

  export { getEntry, getCategoryEntries, getSearchedEntries, postEntry, deleteEntry, patchEntry };