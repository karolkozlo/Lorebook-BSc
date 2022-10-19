import LbAPI from "./LbAPI.js";

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

/**
 *
 * @param {{ title: String }} fields
 * @param { Number } contentID
 */
 async function createLinkGroup(fields, contentID) {
    let fieldsToSend = fields;
    fieldsToSend.contentID = contentID;
    return await LbAPI
        .post(`/link_groups/`, fieldsToSend)
        .then((response) => {
            return response.data;
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

async function updateLink(id, description, contentID) {
  const url = contentID ? `/links/${id}/content/${contentID}` : `/links/${id}`;
  return await LbAPI
      .patch(url, description)
      .then(() => {
          return true;
      })
      .catch((error) => {
          if (error.response && error.response.data.message) {
              const err = new Error(`${error.response.data.message}`);
              throw err;
          } else if (error.request) {
              throw new Error("Service refused connection");
          } else {
              throw new Error("Undefined error");
          }
      });
};

async function updateLinkGroup(id, title, contentID) {
  return await LbAPI
      .patch(`/link_groups/${id}/content/${contentID}`, title)
      .then(() => {
          return true;
      })
      .catch((error) => {
          if (error.response && error.response.data.message) {
              const err = new Error(`${error.response.data.message}`);
              throw err;
          } else if (error.request) {
              throw new Error("Service refused connection");
          } else {
              throw new Error("Undefined error");
          }
      });
};

async function deleteLinkGroup(id, contentID) {
    return await LbAPI
        .delete(`/link_groups/${id}/content/${contentID}`)
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

async function deleteLink(id, contentID) {
  const url = contentID ? `/links/${id}/content/${contentID}` : `/links/${id}`;
  return await LbAPI
      .delete(url)
      .then(() => {
          return true;
      })
      .catch((error) => {
          if (error.response && error.response.data.message) {
              const err = new Error(`${error.response.data.message}`);
              throw err;
          } else if (error.request) {
              throw new Error("Service refused connection");
          } else {
              throw new Error("Undefined error");
          }
      });
};

async function createLink(targetID, categoryID, description, linkGroupID, chapterID) {
  let targetType;
  switch (categoryID) {
    case 'Locations':
      targetType = 'Location';
    break;
    case 'Characters':
      targetType = 'Character';
    break;
    case 'Events':
      targetType = 'Event';
    break;
    default:
      targetType = 'Entry';
    break;
  };
  const bodyToSend = {
    targetID,
    targetType,
    description
  };
  if (linkGroupID && !chapterID) {
    bodyToSend.linkGroupID = linkGroupID;
  } else if (chapterID && !linkGroupID) {
    bodyToSend.chapterID = chapterID;
  } else {
    throw new Error('You should give linkGroupID OR chapterID in arguments');
  }
  return await LbAPI
    .post(`/links`, bodyToSend)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.data.message) {
        const err = new Error(`${error.response.data.message}`);
        throw err;
      } else if (error.request) {
            throw new Error("Service refused connection");
      } else {
          throw new Error("Undefined error");
      }
  });
};

async function getChapterLinks(chapterID) {
  return await LbAPI
    .get(`/links/chapter/${chapterID}`)
    .then((response) => {
          return response.data.map(l => {
            return linkMapper(l);
          });
        })
    .catch((error) => {
      if (error.response && error.response.data.message) {
        const err = new Error(`${error.response.data.message}`);
        throw err;
      } else if (error.request) {
        throw new Error("Service refused connection");
      } else {
        throw new Error("Undefined error");
      }
    });
};

export {
  createLinkGroup,
  updateLinkGroup,
  deleteLinkGroup,
  deleteLink,
  updateLink,
  createLink,
  getChapterLinks
};