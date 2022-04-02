import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { UniqueConstraintError } from 'sequelize';

async function createCategory(name, universeID) {
    try {
        let category = await db.Category.create({
            name: name,
            Universe_id: universeID
        });
        return category;
    } catch(err) {
        if(err instanceof UniqueConstraintError) {
            throw new Error("Category with that name already exists");
        }
        throw new Error(err.message);
    }
};

async function findCategory(id) {
    try {
        const category = db.Category.findOne({
            where: {
                id: id
            }
        });
        return category;
    } catch(err) {
        throw new NotFoundException("Category not found");
    }
};

async function findUniverseCategories(universeID) {
    try {
        const categories = db.Category.findAll({
            where: {
                Universe_id: universeID,
            },
        });
        return categories;
    } catch(err) {
        throw new NotFoundException("Categories for this universe were not found");
    }
};

async function destroyCategory(id) {
    try {
        await db.Category.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateCategory(id, name) {
    try {
        let subsetFields = {};
        subsetFields.name = name;
        await db.Category.update(subsetFields, { where: { id: id } })
    } catch (err) {
        if(err instanceof UniqueConstraintError) {
            throw new Error("Category with that name already exists");
        }
        throw new Error(err.message);
    }
};

export { createCategory, updateCategory, findCategory, findUniverseCategories, destroyCategory };