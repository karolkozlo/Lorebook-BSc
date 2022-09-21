import LbAPI from "./LbAPI.js";
import contentElementType from "@/domain/contentElementTypes.js";

const universeElementType = {
  entry: 'Entry',
  event: 'Event',
  location: 'Location',
  character: 'Character',
};

function linkTargetID(link) {
  if (link.Character_id) return link.Character_id;
  if (link.Location_id) return link.Location_id;
  if (link.Event_id) return link.Event_id;
  if (link.Entry_id) return link.Entry_id;
};

function linkMapper(link) {
  return {
    id: link.id,
    description: link.description,
    targetName: link.target.name,
    targetID: linkTargetID(link),
    categoryName: link.target.Category.name,
    categoryID: link.target.Category.id
  };
};

function linkGroupMapper(linkGroups, links) {
  return linkGroups.map(lg => {
    return {
      id: lg.id,
      title: lg.title,
      links: links.filter(l => { return l.Link_group_id == lg.id })
                  .map(l => { return linkMapper(l) }),
      type: contentElementType.linkGroup
    };
  });
};

function listItemMapper(listItem) {
  return {
    id: listItem.id,
    title: listItem.title,
    text: listItem.text,
    ordinalNumber: listItem.ordinal_number
  };
};

function listMapper(lists) {
  return lists.map(list => {
    return {
      id: list.id,
      title: list.title,
      items: list.ListItems.map(item => { return listItemMapper(item); }),
      type: contentElementType.list
    };
  });
};

function textsMapper(texts) {
  return texts.map(t => {
    return {
      id: t.id,
      title: t.title,
      text: t.text,
      type: contentElementType.text
    };
  });
};

// TODO: Add fetched images to each group
function imageGroupMapper(imageGroups) {
  return imageGroups.map(ig => {
    return {
      id: ig.id,
      title: ig.title,
      type: contentElementType.imageGroup
    };
  });
};

async function getFullContent(ownerID, categoryID) {
  let type;
  if (categoryID == 'Characters') {
    type = universeElementType.character;
  } else if (categoryID == 'Locations') {
    type = universeElementType.location;
  } else if (categoryID == 'Events') {
    type = universeElementType.event;
  } else {
    type = universeElementType.entry;
  }
  return await LbAPI
      .get(`/contents/${type}/${ownerID}`)
      .then((response) => {
        const mappedResponse = {
          contentID: response.data.content.id,
          configuration: response.data.content.configuration,
          texts: textsMapper(response.data.texts),
          lists: listMapper(response.data.lists),
          linkGroups: linkGroupMapper(response.data.linkGroups, response.data.links),
          imageGroups: imageGroupMapper(response.data.imageGroups),
          tags: response.data.tags
        }
        return mappedResponse;
      })
      .catch((error) => {
          if (error.response && error.response.data.message) {
              throw new Error(`${error.response.data.message}`);
          } else if (error.request) {
              throw new Error("Service refused connection");
          } else {
              throw new Error("Undefined error");
          }
      });
};

async function updateContentConfig(id, configuration) {
  const payload = { config: configuration };
  return await LbAPI
      .patch(`/contents/${id}`, payload)
      .then(() => {
          return true;
      })
      .catch((error) => {
          if (error.response && error.response.data.message) {
              throw new Error(`${error.response.data.message}`);
          } else if (error.request) {
              throw new Error("Service refused connection");
          } else {
              throw new Error("Undefined error");
          }
      });
};

export {
  getFullContent,
  updateContentConfig
};