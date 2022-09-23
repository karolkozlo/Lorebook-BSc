import { getCharacter, updateCharacter, searchCharacters } from './character.http.js';
import { getEntry, updateEntry, searchEntries } from './entry.http.js';
import { getLocation, updateLocation, searchLocations } from './location.http.js';
import { getEvent, updateEvent, searchEvents } from './event.http.js';

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
};

async function searchElements(universeID, queryText, elementsPerPage, page, categoryID) {
  let elements = null;
  switch (categoryID) {
    case 'Locations':
      elements = await searchLocations(universeID, queryText, elementsPerPage, page);
      break;
    case 'Characters':
      elements = await searchCharacters(universeID, queryText, elementsPerPage, page);
      break;
    case 'Events':
      elements = await searchEvents(universeID, queryText, elementsPerPage, page);
      break;
    default:
      elements = await searchEntries(categoryID, queryText, elementsPerPage, page);
      break;
  };
  const searchResult = {
    elements: elements.rows,
    elementCount: elements.count,
    totalPages: Math.ceil(elements.count / elementsPerPage)
  };
  return searchResult;
};

export {
  getElement,
  updateElement,
  searchElements
};