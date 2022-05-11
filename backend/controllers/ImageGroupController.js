import {
    createImageGroup,
    findImageGroup,
    findContentImageGroups,
    updateImageGroup,
    destroyImageGroup,
} from "../services/ImageGroupService.js";
import { NotFoundException } from "../errors.js";
import { insertIDintoConfig } from "../services/utils.js";
import { updateContentConfig } from "../services/ContentService.js";

async function getImageGroup(req, res) {
    if (req.params.id === undefined) {
        res.status(400).send({ message: "id must be defined" });
        return;
    }
    try {
      const imageGroup = await findImageGroup(req.params.id);
      res.status(200).json(imageGroup);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getContentImageGroups(req, res) {
    if (req.params.contentID === undefined) {
        res.status(400).send({ message: "contentID must be defined" });
        return;
    }
    try {
      const imageGroups = await findContentImageGroups(req.params.contentID);
      res.status(200).json(imageGroups);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postImageGroup(req, res) {
    try {
      const createdImageGroup = await createImageGroup(
        req.body.title,
        req.body.contentID
      );
      const newConfig = insertIDintoConfig(req.body.config, createdImageGroup.id);
      await updateContentConfig(newConfig, req.body.contentID);
      res.status(201).json(createdImageGroup);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteImageGroup(req, res) {
    try {
      await destroyImageGroup(req.params.id, req.params.contentID);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchImageGroup(req, res) {
    try {
      await updateImageGroup(req.params.id, req.body.title, req.params.contentID);
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

  export { getImageGroup, getContentImageGroups, postImageGroup, deleteImageGroup, patchImageGroup };