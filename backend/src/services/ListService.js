import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { pingContentOwner, insertElementIntoConfig, removeElementFromConfig } from "./utils.js"
import { contentElementType } from "../domainTypes.js";

async function createList(title, contentID) {
    try {
        const list = await db.List.create({
            title: title,
            Content_id: contentID
        });
        await insertElementIntoConfig(contentID, {id: list.id, type: contentElementType.list});
        pingContentOwner(contentID);
        return list;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findList(id) {
    try {
        const list = db.List.findOne({
            where: {
                id: id
            }
        });
        return list;
    } catch(err) {
        throw new NotFoundException("List not found");
    }
};

async function findContentLists(contentID) {
    try {
        const lists = await db.List.findAll({
            where: {
                Content_id: contentID,
            },
            include: {
                model: db.ListItem,
                attributes: {
                    exclude: ["List_id"]
                }
            }
        });
        return lists;
    } catch(err) {
        throw new NotFoundException("Lists for this content were not found");
    }
};

async function destroyList(id, contentID) {
    try {
        await db.List.destroy({
          where: { id: id },
        });
        await removeElementFromConfig(contentID, id, contentElementType.list);
        pingContentOwner(contentID);
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateList(id, title, contentID) {
    try {
        let subsetFields = {title: title};
        await db.List.update(subsetFields, { where: { id: id } });
        pingContentOwner(contentID);
    } catch (err) {
        throw new Error(err.message);
    }
};

export { createList, updateList, findList, findContentLists, destroyList };