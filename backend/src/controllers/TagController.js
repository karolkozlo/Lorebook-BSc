import {
    createTag,
    addTagToContent,
    createTagInContent,
    updateTag,
    findTag,
    findUniverseTags,
    searchTags,
    searchTagList,
    findContentTags,
    destroyTag,
    destroyTagContent
} from "../services/TagService.js";
import { NotFoundException } from "../errors.js";

async function getTag(req, res) {
    if (req.params.id === undefined)
        res.status(400).send({ message: "ID must be defined" });
    try {
        const tag = await findTag(req.params.id);
        res.status(200).json(tag);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function getUniverseTags(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
    }
    try {
        const tags = await findUniverseTags(req.params.universeID);
        res.status(200).json(tags);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function getContentTags(req, res) {
    if (req.params.contentID === undefined) {
        res.status(400).send({ message: "contentID must be defined" });
    }
    try {
        const tags = await findContentTags(req.params.contentID);
        res.status(200).json(tags);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function getSearchedTags(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
    }
    try {
        let q = req.query.q;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        const tags = await searchTags(req.params.universeID, q, limit, offset);
        res.status(200).json(tags);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

async function getSearchedTagList(req, res) {
    if (req.params.universeID === undefined) {
        res.status(400).send({ message: "universeID must be defined" });
        return;
    }
    try {
        let q = req.query.q;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        const tags = await searchTagList(req.params.universeID, q, limit, offset);
        res.status(200).json(tags);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

async function postTag(req, res) {
    try {
        const createdTag = await createTag(
            req.body.universeID,
            req.body.name,
        );
        res.status(201).json(createdTag);
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function postTagToContent(req, res) {
    const body = req.body;
    try {
        if(body.tagID && body.contentID) {
            await addTagToContent(body.tagID, body.contentID);
            res.status(201).send("Added Tag to Content of Universe's Item");
        } else if(body.name && body.contentID && body.universeID) {
            const createdTag = await createTagInContent(body.name, body.contentID, body.universeID);
            res.status(201).send(createdTag);
        } else {
            res.status(400).send({message: "Body of request should contain tagID and contentID OR name, contentID and universeID"});
        }
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function deleteTag(req, res) {
    try {
        await destroyTag(req.params.id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function deleteTagFromContent(req, res) {
    try {
        await destroyTagContent(req.params.contentID, req.params.id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function patchTag(req, res) {
    try {
        const id = req.params.id;
        await updateTag(id, req.body.name);
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
    getTag,
    getUniverseTags,
    getContentTags,
    getSearchedTags,
    getSearchedTagList,
    postTag,
    postTagToContent,
    deleteTag,
    deleteTagFromContent,
    patchTag
};