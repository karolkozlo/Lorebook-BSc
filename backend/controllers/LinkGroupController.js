import {
    createLinkGroup,
    findLinkGroup,
    findContentLinkGroups,
    updateLinkGroup,
    destroyLinkGroup,
} from "../services/LinkGroupService.js";
import { NotFoundException } from "../errors.js";

async function getLinkGroup(req, res) {
    if (req.params.id === undefined)
      res.status(400).send({ message: "ID must be defined" });
    try {
      const linkGroup = await findLinkGroup(req.params.id);
      res.status(200).json(linkGroup);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getContentLinkGroups(req, res) {
    if (req.params.contentID === undefined) {
        res.status(400).send({ message: "contentID must be defined" });
    }
    try {
      const linkGroups = await findContentLinkGroups(req.params.contentID);
      res.status(200).json(linkGroups);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postLinkGroup(req, res) {
    try {
      const createdLinkGroup = await createLinkGroup(
        req.body.title,
        req.body.contentID
      );
      res.status(201).json(createdLinkGroup);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteLinkGroup(req, res) {
    try {
      await destroyLinkGroup(req.params.id, req.params.contentID);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchLinkGroup(req, res) {
    try {
      const id = req.params.id;
      await updateLinkGroup(id, req.body.title, req.params.contentID);
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

  export { getLinkGroup, getContentLinkGroups, postLinkGroup, deleteLinkGroup, patchLinkGroup };