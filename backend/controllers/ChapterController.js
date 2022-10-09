import {
    createChapter,
    updateChapter,
    changeChapterPosition,
    findChapter,
    findStoryChapters,
    searchChapters,
    destroyChapter
} from "../services/ChapterService.js";
import { NotFoundException } from "../errors.js";

async function getChapter(req, res) {
    if (req.params.id === undefined)
        res.status(400).send({ message: "ID must be defined" });
    try {
        const chapter = await findChapter(req.params.id);
        res.status(200).json(chapter);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function getStoryChapters(req, res) {
    if (req.params.storyID === undefined) {
        res.status(400).send({ message: "storyID must be defined" });
    }
    try {
        const chapters = await findStoryChapters(req.params.storyID, parseInt(req.query.limit), parseInt(req.query.offset));
        res.status(200).json(chapters);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function getSearchedChapters(req, res) {
    if (req.params.storyID === undefined) {
        res.status(400).send({ message: "storyID must be defined" });
    }
    try {
        let q = req.query.q;
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        const chapters = await searchChapters(req.params.storyID, q, limit, offset);
        res.status(200).json(chapters);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}

async function postChapter(req, res) {
    try {
        const createdChapter = await createChapter(
            req.body.title,
            req.body.text,
            req.body.ordinalNumber,
            req.body.storyID
        );
        res.status(201).json(createdChapter);
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function deleteChapter(req, res) {
    try {
        await destroyChapter(req.params.id);
        res.status(200).send();
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

async function patchChapter(req, res) {
    try {
        const id = req.params.id;
        await updateChapter(id, req.body);
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

async function patchChapterPosition(req, res) {
    try {
        const id = req.params.id;
        if (!req.body || !req.body.storyID || !req.body.oldOrdinalNumber || !req.body.newOrdinalNumber) {
            res.status(400).send({ message: "Body of request should contain: storyID, oldOrdinalNumber and newOrdinalNumber" });
        } else {
            if (req.body.oldOrdinalNumber != req.body.newOrdinalNumber) {
                await changeChapterPosition(id, req.body.storyID, req.body.oldOrdinalNumber, req.body.newOrdinalNumber);
            }
            res.status(200).send();
        }
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
}

export {
    getChapter,
    getStoryChapters,
    getSearchedChapters,
    postChapter,
    deleteChapter,
    patchChapter,
    patchChapterPosition
};