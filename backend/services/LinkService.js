import { db } from '../models/index.js';
import { pingContentOwner } from "./utils.js";
import { NotFoundException } from "../errors.js";
import { ForeignKeyConstraintError } from 'sequelize';

async function getTarget(link) {
    let richLink = link;
    try {
        if (link.Character_id) {
            let targetCharacter = await db.Character.findByPk(link.Character_id, {
                raw: true,
                attributes: ['name', 'description']
            });
            richLink.target = targetCharacter;
        } else if (link.Location_id) {
            let targetLocation = await db.Location.findByPk(link.Location_id, {
                raw: true,
                attributes: ['name', 'description']
            });
            richLink.target = targetLocation;
        } else if (link.Event_id) {
            let targetEvent = await db.Event.findByPk(link.Event_id, {
                raw: true,
                attributes: ['name', 'description']
            });
            richLink.target = targetEvent;
        } else if (link.Entry_id) {
            let targetEntry = await db.Entry.findByPk(link.Entry_id, {
                attributes: ['name', 'description'],
                include: {
                    model: db.Category,
                    attributes: ['name'],
                }
            });
            richLink.target = targetEntry;
        }
        return richLink;
    } catch (err) {
        throw new Error(`Link's (id: ${link.id}) target not found`);
    }
};

async function enrichLinks(links) {
    let linkEnrichers = [];
    linkEnrichers = links.map(link => {
        return new Promise(async (resolve, reject) => {
            try {
                let richLink = await getTarget(link);
                resolve(richLink);
            } catch (err) {
                reject(err.message);
            }
        });
    });
    let richLinks = await Promise.all(linkEnrichers);
    return richLinks;
};

async function createLink(targetID, targetType, description, chapterID, linkGroupID) {
    try {
        let where = {
            description: description,
            Chapter_id: chapterID,
            Link_group_id: linkGroupID
        };
        if (targetType == "Entry" || targetType == "Event" || targetType == "Location" || targetType == "Character") {
            where[targetType + "_id"] = targetID;
        } else {
            throw new Error("Invalid targetType of Link!");
        };
        let Link = await db.Link.create(where);
        return Link;
    } catch (err) {
        if (err instanceof ForeignKeyConstraintError) {
            let linkContainerMessage = ``;
            if (chapterID) {
                linkContainerMessage = `in Chapter with id: ${chapterID}`;
            } else {
                linkContainerMessage = `in Link group with id: ${linkGroupID}`;
            }
            throw new NotFoundException(`Cannot create link to ${targetType} with id: ${targetID} ${linkContainerMessage}`);
        } else {
            throw new Error(err.message);
        }
    }
};

async function findLink(id) {
    try {
        const Link = await db.Link.findOne({
            where: {
                id: id
            }
        });
        return Link;
    } catch (err) {
        throw new NotFoundException("Link not found");
    }
};

async function findGroupLinks(linkGroupID) {
    try {
        const links = await db.Link.findAll({
            where: {
                Link_group_id: linkGroupID,
            },
            raw: true,
        });
        return await enrichLinks(links);
    } catch (err) {
        throw new NotFoundException("Links for this link group were not found");
    }
};

async function findChapterLinks(chapterID) {
    try {
        const links = await db.Link.findAll({
            where: {
                Chapter_id: chapterID,
            },
            raw: true
        });
        return await enrichLinks(links);
    } catch (err) {
        throw new NotFoundException("Links for this link group were not found");
    }
};

async function findLinksTo(targetID, targetType) {
    try {
        let where = {};
        if (targetType == "Entry" || targetType == "Event" || targetType == "Location" || targetType == "Character") {
            where[targetType + "_id"] = targetID;
        } else {
            throw new Error("Invalid targetType of Link!");
        };
        const links = await db.Link.findAll({
            where: where
        });
        return links;
    } catch (err) {
        throw new NotFoundException("Links for this link group were not found");
    }
};

async function destroyLink(id, contentID) {
    try {
        await db.Link.destroy({
            where: { id: id },
        });
        if (contentID) {
            pingContentOwner(contentID);
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

async function updateLink(id, description, contentID) {
    try {
        let subsetFields = { description: description };
        await db.Link.update(subsetFields, { where: { id: id } });
        pingContentOwner(contentID);
    } catch (err) {
        throw new Error(err.message);
    }
};


export {
    createLink,
    destroyLink,
    updateLink,
    findLink,
    findGroupLinks,
    findChapterLinks,
    findLinksTo
};