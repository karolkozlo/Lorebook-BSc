import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { UniqueConstraintError } from 'sequelize';
import { destroyTemplatesOfType } from "./TemplateService.js";

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
        const categories = await db.Category.findAll({
            attributes: ['id', 'name'],
            where: {
                Universe_id: universeID,
            },
            raw: true
        });
        return categories;
    } catch(err) {
        throw new NotFoundException("Categories for this universe were not found");
    }
};

async function findUniverseCategoryList(universeID) {
    try {
        const categoryList = await db.sequelize.query(`
        SELECT "Characters" as id, "Characters" as name, COUNT(c.id) as elementCount
        FROM characters c
        WHERE c.Universe_id = :universeID
        UNION ALL
        SELECT "Locations" as id, "Locations" as name, COUNT(l.id) as elementCount
        FROM locations l
        WHERE l.Universe_id = :universeID
        UNION ALL
        SELECT "Events" as id, "Events" as name, COUNT(e.id) as elementCount
        FROM events e
        WHERE e.Universe_id = :universeID
        UNION ALL
        SELECT c.id, c.name, COUNT(e.id) as elementCount
        FROM entries e
        RIGHT JOIN categories c ON e.Category_id = c.id
        WHERE c.Universe_id = :universeID
        GROUP BY c.id;`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: {
                universeID: universeID
            }
        });
        return categoryList;
    } catch(err) {
        throw new NotFoundException("Categories for this universe were not found");
    }
};

async function destroyCategory(id) {
    try {
        let category = await db.Category.findByPk(id, {
            raw: true
        });
        await destroyTemplatesOfType(category.name);
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

export {
    createCategory,
    updateCategory,
    findCategory,
    findUniverseCategories,
    findUniverseCategoryList,
    destroyCategory
};