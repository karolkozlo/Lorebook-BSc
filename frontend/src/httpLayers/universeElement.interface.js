import { getCharacter, updateCharacter } from './character.http.js';
import { getEntry, updateEntry } from './entry.http.js';
import { getLocation, updateLocation } from './location.http.js';
import { getEvent, updateEvent } from './event.http.js';

async function getElement(id, categoryID) {
  let element = null;
  if (categoryID == 'Characters') {
    element = await getCharacter(id);
  } else if (categoryID == 'Locations') {
    element = await getLocation(id);
  } else if (categoryID == 'Events') {
    element = await getEvent(id);
  } else {
    element = await getEntry(id);
  }
  return element;
};

async function updateElement(id, fields, categoryID) {
  if (categoryID == 'Characters') {
    await updateCharacter(id, fields);
  } else if (categoryID == 'Locations') {
    await updateLocation(id, fields);
  } else if (categoryID == 'Events') {
    await updateEvent(id, fields);
  } else {
    await updateEntry(id, fields);
  }
}

export {
  getElement,
  updateElement
};