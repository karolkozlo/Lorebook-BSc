import { db } from '../models/index.js';

async function createContent(id, type) {
    try {
        let values = {};
        if(type == "Entry" || type == "Event" || type == "Location" || type == "Character") {
            values[type+"_id"] = id;
        } else {
            throw new Error("Invalid type of content!");
        }
        values.configuration = [];
        let content = await db.Content.create(values);
        return content;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function updateContentConfig(newConfig, contentID) {
    try {
        let values = {
            configuration: newConfig
        };
        let content = await db.Content.update(values, {
            where: {
                id: contentID
            }
        });
        return content;
    } catch(err) {
        throw new Error(err.message);
    };
};

async function findContent(id, type) {
    try {
        let content;
        let where = {};
        if(type == "Entry" || type == "Event" || type == "Location" || type == "Character") {
            where[type+"_id"] = id;
        } else {
            throw new Error("Invalid type of content!");
        }
        content = await db.Content.findOne({
            where: where,
            attributes: ["id", "configuration"]
        });
        return content;
    } catch(err) {
        throw new Error(err.message);
    }
};

export {
    createContent,
    updateContentConfig,
    findContent
};