import {
    createLink,
    destroyLink,
    updateLink,
    findLink,
    findGroupLinks,
    findChapterLinks,
    findLinksTo
} from "../services/LinkService.js";
import { NotFoundException } from "../errors.js";

async function getLink(req, res) {
    if (req.params.id === undefined) {
        res.status(400).send({ message: "ID must be defined" });
        return;
    }
    try {
        const link = await findLink(req.params.id);
        res.status(200).json(link);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function getChapterLinks(req, res) {
    if (req.params.chapterID === undefined) {
        res.status(400).send({ message: "chapterID must be defined" });
        return;
    }
    try {
        const links = await findChapterLinks(req.params.chapterID);
        res.status(200).json(links);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

async function getGroupLinks(req, res) {
    if (req.params.linkGroupID === undefined) {
        res.status(400).send({ message: "linkGroupID must be defined" });
        return;
    }
    try {
        const links = await findGroupLinks(req.params.linkGroupID);
        res.status(200).json(links);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

async function getLinksTo(req, res) {
    if (req.params.targetID === undefined || req.params.targetType === undefined) {
        res.status(400).send({ message: "targetID and targetType must be defined" });
        return;
    }
    try {
        const links = await findLinksTo(req.params.targetID, req.params.targetType);
        res.status(200).json(links);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

async function postLink(req, res) {
    if((req.body.chapterID && req.body.linkGroupID) || (!req.body.chapterID && !req.body.linkGroupID)) {
        res.status(400).send({ message: "Body should contain chapterID OR linkGroupID" });
        return;
    }
    try {
        const createdLink = await createLink(
            req.body.targetID,
            req.body.targetType,
            req.body.description,
            req.body.chapterID,
            req.body.linkGroupID
        );
        res.status(201).json(createdLink);
    } catch (e) {
        if (e instanceof NotFoundException) {
            res.status(404);
        } else {
            res.status(400);
        }
        res.send({ message: e.message });
    }
}

async function deleteLink(req, res) {
    try {
        await destroyLink(req.params.id, req.params.contentID);
        res.status(200).send();
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function patchLink(req, res) {
    try {
        const id = req.params.id;
        await updateLink(id, req.body.description, req.params.contentID);
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

export {
    getLink,
    getChapterLinks,
    getGroupLinks,
    getLinksTo,
    postLink,
    deleteLink,
    patchLink
};