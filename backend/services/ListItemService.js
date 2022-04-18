import { db } from '../models/index.js';
import { Sequelize } from "sequelize";
import { NotFoundException } from "../errors.js";
import { pingContentOwner } from "./utils.js";

async function updateListOrder(listID, ordinalNumber, changeNumber) {
    try {
        let Op = Sequelize.Op;
        await db.ListItem.update(
            { ordinal_number: db.sequelize.literal(`ordinal_number + ${changeNumber}`) },
            {
                where: {
                    [Op.and]: [
                        { List_id: listID },
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

async function createListItem(title, text, ordinalNumber, listID, contentID) {
    try {
        await updateListOrder(listID, ordinalNumber, 1);
        const listItem = await db.ListItem.create({
            title: title,
            text: text,
            ordinal_number: ordinalNumber,
            List_id: listID
        });
        pingContentOwner(contentID);
        return listItem;
    } catch (err) {
        throw new Error(err.message);
    }
};

async function findListItem(id) {
    try {
        const listItem = await db.ListItem.findOne({
            where: {
                id: id
            }
        });
        return listItem;
    } catch (err) {
        throw new NotFoundException("ListItem not found");
    }
};

async function findListItems(listID) {
    try {
        const listItems = db.ListItem.findAll({
            where: {
                List_id: listID,
            },
            order: [['ordinal_number', 'ASC']]
        });
        return listItems;
    } catch (err) {
        throw new NotFoundException("Items for this List were not found");
    }
};

async function destroyListItem(id, contentID) {
    try {
        let item = await db.ListItem.findOne({
            where: {
                id: id
            },
            raw: true,
        });
        await updateListOrder(item.List_id, item.ordinal_number, -1);
        await db.ListItem.destroy({
            where: { id: id },
        });
        pingContentOwner(contentID);
    } catch (err) {
        throw new Error(err.message);
    }
};

async function updateListItem(id, updatedFields, contentID) {
    try {
        const modelKeys = Object.keys(db.ListItem.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
                subset[key] = updatedFields[key];
                return subset;
            }, {});
        await db.ListItem.update(subsetFields, { where: { id: id } });
        pingContentOwner(contentID);
    } catch (err) {
        throw new Error(err.message);
    }
};

async function changeListItemPosition(id, listID, oldOrdinalNumber, newOrdinalNumber, contentID) {
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
        await db.ListItem.update(
            { ordinal_number: db.sequelize.literal(`ordinal_number + ${changeNumber}`) },
            {
                where: {
                    [Op.and]: [
                        { List_id: listID },
                        {
                            ordinal_number: {
                                [Op.between]: [start, end]
                            }
                        }
                    ]
                }
            }
        );
        await db.ListItem.update(
            { ordinal_number: newOrdinalNumber },
            { where: { id: id }}
        );
        pingContentOwner(contentID);
    } catch (err) {
        throw new Error(err.message);
    }
}

export { createListItem, updateListItem, changeListItemPosition, findListItem, findListItems, destroyListItem };