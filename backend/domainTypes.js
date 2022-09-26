const contentElementType = {
  text: 'TEXT',
  list: 'LIST',
  imageGroup: 'IMAGE_GROUP',
  linkGroup: 'LINK_GROUP',
};

const hardcodedTablesType = {
  locations: 'Locations',
  characters: 'Characters',
  events: 'Events'
};

const hardcodedTablesArray = [hardcodedTablesType.locations, hardcodedTablesType.characters, hardcodedTablesType.events];

export {
  contentElementType,
  hardcodedTablesType,
  hardcodedTablesArray
};