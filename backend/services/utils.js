import { db } from '../models/index.js';
import { updateCharacter } from "./CharacterService.js";
import { updateEntry } from "./EntryService.js";
import { updateLocation } from "./LocationService.js";
import { updateEvent } from "./EventService.js";

function insertIDintoConfig(config, id) {
    for(let i = 0; i < config.length; i++) {
        if(config[i].id == null) {
            config[i].id = id;
            break;
        }
    }
    return config;
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
    insertIDintoConfig
};