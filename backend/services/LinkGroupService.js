import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { pingContentOwner } from "./utils.js"

async function createLinkGroup(title, contentID) {
    try {
        const linkGroup = await db.LinkGroup.create({
            title: title,
            Content_id: contentID
        });
        pingContentOwner(contentID);
        return linkGroup;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findLinkGroup(id) {
    try {
        const linkGroup = db.LinkGroup.findOne({
            where: {
                id: id
            }
        });
        return linkGroup;
    } catch(err) {
        throw new NotFoundException("LinkGroup not found");
    }
};

async function findContentLinkGroups(contentID) {
    try {
        const linkGroups = await db.LinkGroup.findAll({
            where: {
                Content_id: contentID,
            },
        });
        return linkGroups;
    } catch(err) {
        throw new NotFoundException("LinkGroups for this content were not found");
    }
};

async function destroyLinkGroup(id, contentID) {
    try {
        await db.LinkGroup.destroy({
          where: { id: id },
        });
        pingContentOwner(contentID);
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateLinkGroup(id, title, contentID) {
    try {
        let subsetFields = {title: title};
        await db.LinkGroup.update(subsetFields, { where: { id: id } });
        pingContentOwner(contentID);
    } catch (err) {
        throw new Error(err.message);
    }
};

export { createLinkGroup, updateLinkGroup, findLinkGroup, findContentLinkGroups, destroyLinkGroup };