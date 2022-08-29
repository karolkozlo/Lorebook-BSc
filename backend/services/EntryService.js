import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { Sequelize } from "sequelize";
import { currentDateTimetoIsoString } from "./utils.js";
import { createContent } from "./ContentService.js";

async function createEntry(name, description, categoryID) {
    let lastModified = currentDateTimetoIsoString();
    try {
        let entry = await db.Entry.create({
            name: name,
            description: description,
            last_modified: lastModified,
            Category_id: categoryID
        });
        await createContent(entry.getDataValue("id"), "Entry");
        return entry;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findEntry(id) {
    try {
        const entry = db.Entry.findOne({
            where: {
                id: id
            }
        });
        return entry;
    } catch(err) {
        throw new NotFoundException("Entry not found");
    }
};

async function findCategoryEntries(categoryID, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    try {
        const entries = await db.Entry.findAll({
            where: {
                Category_id: categoryID,
            },
            offset: findOffset,
            limit: findLimit,
            order: [['last_modified', 'DESC']]
        });
        return entries;
    } catch(err) {
        throw new NotFoundException("Entries for this category were not found");
    }
};

async function searchEntries(categoryID, expr, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    let searchLike = '.*'+expr+'.*';
    let Op = Sequelize.Op;
    try {
        const entries = db.Entry.findAll({
            where: {
                [Op.and]: [
                    {
                        Category_id: categoryID
                    },
                    {name: {
                        [Op.regexp]: searchLike
                    }}
                ]
            },
            offset: findOffset,
            limit: findLimit,
            order: [['last_modified', 'DESC']]
        });
        return entries;
    } catch(err) {
        throw new Error(err.message);
    }
}

async function destroyEntry(id) {
    try {
        await db.Entry.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateEntry(id, updatedFields) {
    let lastModified = currentDateTimetoIsoString();
    try {
        const modelKeys = Object.keys(db.Entry.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});
        subsetFields.last_modified = lastModified;
        await db.Entry.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
};

export { createEntry, updateEntry, findEntry, findCategoryEntries, searchEntries, destroyEntry };