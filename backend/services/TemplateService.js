import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { findUniverseCategories } from "./CategoryService.js";

async function validateTemplate(type, data, universeID) {
    try {
        let isTypeValid = false;
        if(type != "character" && type != "location" && type != "event") {
            const categories = await findUniverseCategories(universeID);
            for (let i =0; i<categories.length; i++) {
                if(categories[i].name == type) {
                    isTypeValid = true;
                    break;
                }
            }
            if(!isTypeValid) {
                throw new Error(`Invalid type of template: \'${type}\'`);
            }
        } else {
            isTypeValid = true;
        }
        if(isTypeValid) {
            for (let i = 0; i<data.length; i++) {
                if(data[i].type != "text" && data[i].type != "list" && data[i].type != "link_group" && data[i].type != "image_group") {
                    throw new Error(`Invalid type of content element: \'${data[i].type}\'`);
                }
            }
            return true;
        }
        return false;
    } catch (err) {
        throw new Error(err);
    };
};

async function createTemplate(name, type, templateData, universeID) {
    try {
        let isTemplateValid = await validateTemplate(type, templateData, universeID);
        if(!isTemplateValid) {
            throw new Error("Template is not valid!");
        }
        const template = await db.Template.create({
            name: name,
            type: type,
            template: templateData,
            Universe_id: universeID
        });
        return template;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findTemplate(id) {
    try {
        const template = db.Template.findOne({
            where: {
                id: id
            }
        });
        return template;
    } catch(err) {
        throw new NotFoundException("Template not found");
    }
};

async function findUniverseTemplates(universeID) {
    try {
        const templates = db.Template.findAll({
            where: {
                Universe_id: universeID,
            },
        });
        return templates;
    } catch(err) {
        throw new NotFoundException("Templates for this universe were not found");
    }
};

async function findTemplatesOfType(universeID, type) {
    try {
        const Op = db.Sequelize.Op;
        const templates = db.Template.findAll({
            where: {
                [Op.and]: [
                    { Universe_id: universeID },
                    { type: type }
                ]
            },
        });
        return templates;
    } catch(err) {
        throw new NotFoundException("Templates for this universe were not found");
    }
};

async function destroyTemplate(id) {
    try {
        await db.Template.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function destroyTemplatesOfType(type) {
    try {
        await db.Template.destroy({
          where: { type: type },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateTemplate(id, updatedFields) {
    try {
        const modelKeys = Object.keys(db.Template.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});
        await db.Template.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
};

export {
    createTemplate,
    updateTemplate,
    findTemplate,
    findUniverseTemplates,
    findTemplatesOfType,
    destroyTemplate,
    destroyTemplatesOfType
};