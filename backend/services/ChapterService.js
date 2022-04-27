import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { Sequelize } from "sequelize";
import { applyPatch } from "diff";

async function updateStoryOrder(storyID, ordinalNumber, changeNumber) {
    try {
        let Op = Sequelize.Op;
        await db.Chapter.update(
            { ordinal_number: db.sequelize.literal(`ordinal_number + ${changeNumber}`) },
            {
                where: {
                    [Op.and]: [
                        { Story_id: storyID },
                        {
                            ordinal_number: {
                                [Op.gte]: ordinalNumber
                            }
                        }
                    ]
                }
            }
        );
    } catch (err) {
        throw new Error(err.message);
    }
}

async function createChapter(title, text, description, ordinalNumber, storyID) {
    try {
        await updateStoryOrder(storyID, ordinalNumber, 1);
        const chapter = await db.Chapter.create({
            title: title,
            text: text,
            description: description,
            ordinal_number: ordinalNumber,
            Story_id: storyID
        });
        return chapter;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findChapter(id) {
    try {
        const chapter = db.Chapter.findOne({
            where: {
                id: id
            }
        });
        return chapter;
    } catch(err) {
        throw new NotFoundException("Chapter not found");
    }
};

async function findStoryChapters(storyID, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    try {
        const chapters = db.Chapter.findAll({
            where: {
                Story_id: storyID,
            },
            offset: findOffset,
            limit: findLimit,
        });
        return chapters;
    } catch(err) {
        throw new NotFoundException("Chapters for this Story were not found");
    }
};

async function searchChapters(storyID, expr, limit, offset) {
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
        const chapters = db.Chapter.findAll({
            where: {
                [Op.and]: [
                    {Story_id: storyID},
                    {title: {
                        [Op.regexp]: searchLike
                    }}
                ]
            },
            offset: findOffset,
            limit: findLimit,
        });
        return chapters;
    } catch(err) {
        throw new Error(err.message);
    }
}

async function destroyChapter(id) {
    try {
        let chapter = await db.Chapter.findOne({
            where: {
                id: id
            },
            raw: true,
        });
        await updateStoryOrder(chapter.Story_id, chapter.ordinal_number, -1);
        await db.Chapter.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateChapter(id, updatedFields) {
    try {
        const modelKeys = Object.keys(db.Chapter.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});

        if(updatedFields.textPatch) {
            let chapterToUpdate = await db.Chapter.findByPk(id);
            let newText = applyPatch(JSON.stringify(chapterToUpdate.text), updatedFields.textPatch);
            subsetFields.text = JSON.parse(newText);
        }

        await db.Chapter.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
};

async function changeChapterPosition(id, storyID, oldOrdinalNumber, newOrdinalNumber) {
    let start;
    let end;
    let changeNumber;
    if(oldOrdinalNumber < newOrdinalNumber) {
        start = oldOrdinalNumber;
        end = newOrdinalNumber;
        changeNumber = -1;
    } else {
        start = newOrdinalNumber;
        end = oldOrdinalNumber;
        changeNumber = 1;
    }
    let Op = Sequelize.Op;
    try {
        await db.Chapter.update(
            { ordinal_number: db.sequelize.literal(`ordinal_number + ${changeNumber}`) },
            {
                where: {
                    [Op.and]: [
                        { Story_id: storyID },
                        {
                            ordinal_number: {
                                [Op.between]: [start, end]
                            }
                        }
                    ]
                }
            }
        );
        await db.Chapter.update(
            { ordinal_number: newOrdinalNumber },
            { where: { id: id }}
        );
    } catch (err) {
        throw new Error(err.message);
    }
}

export {
    createChapter,
    updateChapter,
    changeChapterPosition,
    findChapter,
    findStoryChapters,
    searchChapters,
    destroyChapter
};