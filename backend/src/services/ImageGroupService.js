import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { pingContentOwner, insertElementIntoConfig, removeElementFromConfig } from "./utils.js";
import { contentElementType } from "../domainTypes.js";

async function createImageGroup(title, contentID) {
    try {
        const imageGroup = await db.ImageGroup.create({
            title: title,
            Content_id: contentID
        });
        await insertElementIntoConfig(contentID, {id: imageGroup.id, type: contentElementType.imageGroup});
        pingContentOwner(contentID);
        return imageGroup;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findImageGroup(id) {
    try {
        const imageGroup = await db.ImageGroup.findOne({
            where: {
                id: id
            }
        });
        return imageGroup;
    } catch(err) {
        throw new NotFoundException("ImageGroup not found");
    }
};

async function findContentImageGroups(contentID) {
    try {
        const imageGroups = await db.ImageGroup.findAll({
            where: {
                Content_id: contentID,
            },
        });
        return imageGroups;
    } catch(err) {
        throw new NotFoundException("ImageGroups for this content were not found");
    }
};

async function destroyImageGroup(id, contentID) {
    try {
        await db.ImageGroup.destroy({
          where: { id: id },
        });
        await removeElementFromConfig(contentID, id, contentElementType.imageGroup);
        pingContentOwner(contentID);
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateImageGroup(id, title, contentID) {
    try {
        let subsetFields = {title: title};
        await db.ImageGroup.update(subsetFields, { where: { id: id } });
        pingContentOwner(contentID);
    } catch (err) {
        throw new Error(err.message);
    }
};

export { createImageGroup, updateImageGroup, findImageGroup, findContentImageGroups, destroyImageGroup };