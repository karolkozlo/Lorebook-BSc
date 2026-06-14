import { findContent, updateContentConfig } from "../services/ContentService.js";
import { findContentTexts } from "../services/TextService.js";
import { findContentLists } from "../services/ListService.js";
import { findContentLinkGroups } from "../services/LinkGroupService.js";
import { findContentLinks } from "../services/LinkService.js";
import { findContentImageGroups } from "../services/ImageGroupService.js";
import { findContentTags } from "../services/TagService.js";

async function getFullContent(req, res) {
    if (req.params.ownerID === undefined || req.params.type === undefined) {
        res.status(400).send({ message: "ownerID and type must be defined" });
        return;
    }
    try {
        const contentOwnerID = parseInt(req.params.ownerID);
        const content = await findContent(contentOwnerID, req.params.type);
        const contentID = content.id;
        //Array of promises to get every element in chosen content
        const contentPromises = [
            new Promise(async (resolve, reject) => {
                try {
                    let texts = await findContentTexts(contentID);
                    resolve(texts);
                } catch (err) {
                    reject(err.message);
                };
            }),
            new Promise(async (resolve, reject) => {
                try {
                    let lists = await findContentLists(contentID);
                    resolve(lists);
                } catch (err) {
                    reject(err.message);
                };
            }),
            new Promise(async (resolve, reject) => {
                try {
                    let linkGroups = await findContentLinkGroups(contentID);
                    resolve(linkGroups);
                } catch (err) {
                    reject(err.message);
                };
            }),
            new Promise(async (resolve, reject) => {
                try {
                    let links = await findContentLinks(contentID);
                    resolve(links);
                } catch (err) {
                    reject(err.message);
                };
            }),
            new Promise(async (resolve, reject) => {
                try {
                    let imageGroups = await findContentImageGroups(contentID);
                    resolve(imageGroups);
                } catch (err) {
                    reject(err.message);
                };
            }),
            new Promise(async (resolve, reject) => {
                try {
                    let tags = await findContentTags(contentID);
                    resolve(tags);
                } catch (err) {
                    reject(err.message);
                };
            }),
        ];
        const contentElements = await Promise.all(contentPromises);
        const fullContent = {
            content: content,
            texts: contentElements[0],
            lists: contentElements[1],
            linkGroups: contentElements[2],
            links: contentElements[3],
            imageGroups: contentElements[4],
            tags: contentElements[5]
        };
        res.status(200).json(fullContent);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    };
};

async function patchContentConfig(req, res) {
    if (req.params.contentID === undefined) {
        res.status(400).send({ message: "contentID and type must be defined" });
        return;
    }
    try {
        await updateContentConfig(req.body.config, req.params.contentID);
        res.status(200).send();
    } catch (e) {
        res.status(400).send({ message: e.message});
    };
};

export {
    getFullContent,
    patchContentConfig
};