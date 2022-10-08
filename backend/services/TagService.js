import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { Sequelize, QueryTypes } from "sequelize";
import { UniqueConstraintError } from 'sequelize';
import { pingContentOwner } from "./utils.js"

async function createTag(universeID, name) {
    try {
        let tag = await db.Tag.create({
            name: name,
            Universe_id: universeID
        });
        return tag;
    } catch(err) {
        if(err instanceof UniqueConstraintError) {
            throw new Error("Tag with that name already exists");
        }
        throw new Error(err.message);
    }
};

async function createTagInContent(name, contentID, universeID) {
    let Op = Sequelize.Op;
    try {
        let [tag, created] = await db.Tag.findOrCreate({
            where: {
                [Op.and]: [
                    { Universe_id: universeID },
                    { name: name }
                ]
            },
            defaults: {
                name: name,
                Universe_id: universeID
            }
        });
        await db.Content.findByPk(contentID).then(async (Content) => {
            await Content.addTag(tag);
        });
        pingContentOwner(contentID);
        return tag;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function addTagToContent(tagID, contentID) {
    try {
        const tag = await db.Tag.findByPk(tagID);
        await db.Content.findByPk(contentID).then(async (Content) => {
            await Content.addTag(tag);
        });
        pingContentOwner(contentID);
    } catch(err) {
        throw new Error(err.message);
    }
}

async function findTag(id) {
    try {
        const tag = db.Tag.findOne({
            where: {
                id: id
            }
        });
        return tag;
    } catch(err) {
        throw new NotFoundException("Tag not found");
    }
};


async function findUniverseTags(universeID) {
    try {
        const tags = db.Tag.findAll({
            where: {
                Universe_id: universeID,
            },
        });
        return tags;
    } catch(err) {
        throw new NotFoundException("Tags for this universe were not found");
    }
};

async function findContentTags(contentID) {
    try {
        const tags = await db.sequelize.query(`SELECT t.id, t.name
        FROM tags t
        JOIN tag_content tc ON t.id = tc.Tag_id
        JOIN contents c ON c.id = tc.Content_id AND c.id = :contentID;`,
        {
            type: QueryTypes.SELECT,
            replacements: {
                contentID: contentID,
            }
        });
        return tags;
    } catch(err) {
        throw new NotFoundException("Tags for this Content were not found");
    }
}


async function searchTagList(universeID, expr, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    const regExpr = `.*${expr}.*`;
    try {
        const totalCountResult = await db.sequelize.query(`
        SELECT COUNT(id) as totalCount FROM
        (SELECT t.id
        FROM tags t
        LEFT JOIN tag_content tc ON t.id = tc.Tag_id AND t.Universe_id = :universeID
        WHERE t.name REGEXP(:expr)
        GROUP BY t.id) searchCount;`,
        {
            type: QueryTypes.SELECT,
            replacements: {
                universeID: universeID,
                expr: regExpr
            }
        });

        const rows = await db.sequelize.query(`
        SELECT t.id, t.name, COUNT(tc.Tag_id) as elementCount
        FROM tags t
        LEFT JOIN tag_content tc ON t.id = tc.Tag_id AND t.Universe_id = :universeID
        WHERE t.name REGEXP(:expr)
        GROUP BY t.id
        ORDER BY elementCount DESC
        LIMIT :limit
        OFFSET :offset;`,
        {
            type: QueryTypes.SELECT,
            replacements: {
                universeID: universeID,
                limit: findLimit,
                offset: findOffset,
                expr: regExpr
            }
        });
        return {count: totalCountResult[0].totalCount, rows};
    } catch(err) {
        throw new Error(err.message);
    }
};

async function searchTags(universeID, expr, limit, offset) {
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
        const tags = await db.Tag.findAll({
            where: {
                [Op.and]: [
                    {Universe_id: universeID},
                    {name: {
                        [Op.regexp]: searchLike
                    }}
                ]
            },
            offset: findOffset,
            limit: findLimit,
        });
        return tags;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function destroyTagContent(contentID, tagID) {
    try {
        await db.TagContent.destroy({
          where: {
              Content_id: contentID,
              Tag_id: tagID
          },
        });
        pingContentOwner(contentID);
      } catch (err) {
        throw new Error(err.message);
      }
}

async function destroyTag(id) {
    try {
        await db.Tag.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateTag(id, name) {
    try {
        let subsetFields = {};
        subsetFields.name = name;
        await db.Tag.update(subsetFields, { where: { id: id } })
    } catch (err) {
        if(err instanceof UniqueConstraintError) {
            throw new Error("Tag with that name already exists");
        }
        throw new Error(err.message);
    }
};

async function checkTags(universeID, tagNames) {
    let Op = Sequelize.Op;
    try {
        const tags = db.Tag.findAll({
            where: {
                [Op.and]: [
                    {Universe_id: universeID},
                    {name: tagNames}
                ]
            },
            raw: true
        });
        return tags;
    } catch(err) {
        throw new Error(err.message);
    }
};

export {
    createTag,
    addTagToContent,
    createTagInContent,
    updateTag,
    findTag,
    findUniverseTags,
    searchTags,
    searchTagList,
    findContentTags,
    destroyTag,
    destroyTagContent,
    checkTags
 };