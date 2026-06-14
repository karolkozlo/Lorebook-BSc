import { db } from '../models/index.js';
import { updateCharacter } from "./CharacterService.js";
import { updateEntry } from "./EntryService.js";
import { updateLocation } from "./LocationService.js";
import { updateEvent } from "./EventService.js";
import { findContentById, updateContentConfig } from './ContentService.js';

/**
 *
 * @param {Number} contentID
 * @param {{id, type}} contentElement
 */
async function insertElementIntoConfig(contentID, contentElement) {
    try {
        const content = await findContentById(contentID);
        let config = content.configuration;
        config.push(contentElement);
        await updateContentConfig(config, contentID);
    } catch (error) {
        throw new Error(error.message);
    }
};

async function removeElementFromConfig(contentID, idToDelete, typeToDelete) {
    try {
        const content = await findContentById(contentID);
        let config = content.configuration;
        config = config.filter(el => !(el.id == idToDelete && el.type == typeToDelete));
        await updateContentConfig(config, contentID);
    } catch (error) {
        throw new Error(error.message);
    }
};

async function pingContentOwner(contentID) {
    const content = await db.Content.findOne({
        where: {
            id: contentID
        },
        raw: true,
    });
    if(content.Entry_id) {
        await updateEntry(content.Entry_id, {});
    } else if(content.Event_id) {
        await updateEvent(content.Event_id, {});
    } else if(content.Location_id) {
        await updateLocation(content.Location_id, {});
    } else if(content.Character_id) {
        await updateCharacter(content.Character_id, {});
    }
}

function currentDateTimetoIsoString() {
    let today = new Date();
    let tzo = -today.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
    return today.getFullYear() +
        '-' + pad(today.getMonth() + 1) +
        '-' + pad(today.getDate()) +
        'T' + pad(today.getHours()) +
        ':' + pad(today.getMinutes()) +
        ':' + pad(today.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
}

export {
    currentDateTimetoIsoString,
    pingContentOwner,
    insertElementIntoConfig,
    removeElementFromConfig
};