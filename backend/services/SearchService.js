import { db } from '../models/index.js';
import { findCategoryEntries } from './EntryService.js';
import { findUniverseCategoryList } from './CategoryService.js';

async function findShortLists(universeID) {
    try {
        const categories = await findUniverseCategoryList(universeID);
        const filteredCategories = categories.filter(c => {
            return !['Characters', 'Events', 'Locations'].includes(c.id) && c.elementCount != 0;
        });
        const entriesPromises = filteredCategories.map( c => {
            return new Promise(async (resolve, reject) => {
                try {
                    let categoryEntries = await findCategoryEntries(c.id, 3);
                    resolve({
                        id: c.id,
                        name: c.name,
                        elements: categoryEntries,
                        elementCount: c.elementCount
                    });
                } catch (err) {
                    reject(err.message);
                }
            });
        });
        const groupedEntries = await Promise.all(entriesPromises);

        const hardcodedElements = await db.sequelize.query(`
            (SELECT id, name, description, last_modified, "Characters" as catID
            FROM characters ch
            WHERE ch.Universe_id = :universeID
            LIMIT 3)
            UNION ALL
            (SELECT id, name, description, last_modified, "Locations" as catID
            FROM locations l
            WHERE l.Universe_id = :universeID
            LIMIT 3)
            UNION ALL
            (SELECT id, name, description, last_modified, "Events" as catID
            FROM events e
            WHERE e.Universe_id = :universeID
            LIMIT 3)
            ORDER BY last_modified;`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: {
                universeID: universeID
            }
        });
        const hardcodedTables = ['Characters', 'Locations', 'Events'];
        const groupedHardcodedElements = [];

        for (let i = 0; i < hardcodedTables.length; i++) {
            groupedHardcodedElements.push({
                id: hardcodedTables[i],
                name: hardcodedTables[i],
                elements: hardcodedElements.filter(e => {
                    return e.catID == hardcodedTables[i]
                }),
                elementCount: categories.find(c => {
                    return c.id == hardcodedTables[i]
                }).elementCount
            });
        };

        const results = [];
        results.push(...groupedHardcodedElements, ...groupedEntries);
        return results;
    } catch(err) {
        throw new Error(err.message);
    }
};

export {
    findShortLists
};