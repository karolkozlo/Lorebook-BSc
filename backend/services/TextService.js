import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { pingContentOwner } from "./utils.js"

async function createText(title, textData, contentID) {
    try {
        const text = await db.Text.create({
            title: title,
            text: textData,
            Content_id: contentID
        });
        await pingContentOwner(contentID);
        return text;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findText(id) {
    try {
        const text = db.Text.findOne({
            where: {
                id: id
            }
        });
        return text;
    } catch(err) {
        throw new NotFoundException("Text not found");
    }
};

async function findContentTexts(contentID) {
    try {
        const texts = db.Text.findAll({
            where: {
                Content_id: contentID,
            },
        });
        return texts;
    } catch(err) {
        throw new NotFoundException("Texts for this content were not found");
    }
};

async function destroyText(id, contentID) {
    try {
        await db.Text.destroy({
          where: { id: id },
        });
        await pingContentOwner(contentID);
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateText(id, updatedFields, contentID) {
    try {
        const modelKeys = Object.keys(db.Text.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});
        await db.Text.update(subsetFields, { where: { id: id } });
        await pingContentOwner(contentID);
    } catch (err) {
        throw new Error(err.message);
    }
};

export { createText, updateText, findText, findContentTexts, destroyText };