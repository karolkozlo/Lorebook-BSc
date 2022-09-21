import {
    createList,
    findList,
    findContentLists,
    updateList,
    destroyList,
} from "../services/ListService.js";
import { NotFoundException } from "../errors.js";

async function getList(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const list = await findList(req.params.id);
      res.status(200).json(list);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getContentLists(req, res) {
    if (req.params.contentID === undefined) {
        res.status(400).send({ message: "contentID must be defined" });
    }
    try {
      const lists = await findContentLists(req.params.contentID);
      res.status(200).json(lists);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postList(req, res) {
    try {
      const createdList = await createList(
        req.body.title,
        req.body.contentID
      );
      res.status(201).json(createdList);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteList(req, res) {
    try {
      await destroyList(req.params.id, req.params.contentID);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchList(req, res) {
    try {
      const id = req.params.id;
      await updateList(id, req.body.title, req.params.contentID);
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

  export { getList, getContentLists, postList, deleteList, patchList };