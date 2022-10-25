import { db } from '../models/index.js';
import { findCategoryEntries } from './EntryService.js';
import { findUniverseCategoryList } from './CategoryService.js';
import { hardcodedTablesType, hardcodedTablesArray } from '../domainTypes.js';
import { QueryTypes } from "sequelize";

async function findShortLists(universeID) {
    try {
        const categories = await findUniverseCategoryList(universeID);
        const filteredCategories = categories.filter(c => {
            return !['Characters', 'Events', 'Locations'].includes(c.id) && c.elementCount != 0;
        });
        const entriesPromises = filteredCategories.map(c => {
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
            ORDER BY last_modified DESC
            LIMIT 3)
            UNION ALL
            (SELECT id, name, description, last_modified, "Locations" as catID
            FROM locations l
            WHERE l.Universe_id = :universeID
            ORDER BY last_modified DESC
            LIMIT 3)
            UNION ALL
            (SELECT id, name, description, last_modified, "Events" as catID
            FROM events e
            WHERE e.Universe_id = :universeID
            ORDER BY last_modified DESC
            LIMIT 3)
            ORDER BY last_modified DESC;`,
            {
                type: QueryTypes.SELECT,
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
    } catch (err) {
        throw new Error(err.message);
    }
};

//Helper functions
function mapCategoryToID (category) {
  if (category == hardcodedTablesType.characters) return 'Character_id';
  if (category == hardcodedTablesType.locations) return 'Location_id';
  if (category == hardcodedTablesType.events) return 'Event_id';
  return 'Entry_id';
};

function concatTags(tags) {
  const preparedTags = tags.map(t => (`"${t}"`));
  const concatedTags = String.prototype.concat(preparedTags);
  return concatedTags;
};

function queryTags(tags, elementIdField) {
  if (tags && tags.length > 0) {
    return `JOIN contents c ON e.id = c.${elementIdField}
            JOIN tag_content tc ON c.id = tc.Content_id
            JOIN tags t ON tc.Tag_id = t.id AND t.name IN(${concatTags(tags)})`;
  } else {
    return '';
  }
};

async function findSearchedElements(universeID, queryText, categories, tags, limit, offset) {
    try {
        let regexAND = '';
        let regexWHERE = '';
        if (queryText && queryText.length > 0) {
            regexAND = `AND e.name REGEXP(".*${queryText}.*")`;
            regexWHERE = `WHERE e.name REGEXP(".*${queryText}.*")`;
        }

        const subQueries
        = categories.filter(c => (hardcodedTablesArray.includes(c)))
                    .map(cat => {
                        const id = mapCategoryToID(cat);
                        return `(SELECT DISTINCT e.id, e.name, e.last_modified, "${cat}" as Category_id, "${cat}" as categoryName
                        FROM ${cat.toLowerCase()} e
                        ${queryTags(tags, id)}
                        WHERE e.Universe_id = :universeID ${regexAND})`
                    });
        const customCategories = categories.filter(c => { return !hardcodedTablesArray.includes(c);});
        if (customCategories.length !== 0) {
            const id = 'Entry_id';
            const categoryIDs = String.prototype.concat(customCategories);
            const subQuery =
                `(SELECT DISTINCT e.id, e.name, e.last_modified, e.Category_id, cat.name as categoryName
                FROM entries e
                JOIN categories cat ON e.Category_id = cat.id AND cat.id IN (${categoryIDs})
                ${queryTags(tags, id)}
                ${regexWHERE})`;
            subQueries.push(subQuery);
        }

        let query = '';
        for (let i = 0; i < subQueries.length; i++) {
            let subQuery = subQueries[i];
            if (i < subQueries.length - 1) {
                subQuery = `${subQuery} UNION ALL \n`;
            }
            query = query +` ${subQuery}`;
        }
        const queryTotalCount = `SELECT COUNT(searched.id) AS "totalCount" FROM(${query}) searched;`;
        const resultQuery = `${query} ORDER BY last_modified DESC LIMIT ${limit} OFFSET ${offset};`;
        const totalCountResult = await db.sequelize.query(queryTotalCount, {
            type: QueryTypes.SELECT,
            replacements: {
                universeID: universeID
            }
        });
        const rows = await db.sequelize.query(resultQuery, {
            type: QueryTypes.SELECT,
            replacements: {
                universeID: universeID
            }
        });
        return {count: totalCountResult[0].totalCount, rows};
    } catch (err) {
        throw new Error(err.message);
    }
};

export {
    findShortLists,
    findSearchedElements
};