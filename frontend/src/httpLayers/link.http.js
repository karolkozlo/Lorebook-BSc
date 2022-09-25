import LbAPI from "./LbAPI.js";

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

async function updateContentLink(id, description, contentID) {
  return await LbAPI
      .patch(`/links/${id}/content/${contentID}`, description)
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

async function deleteContentLink(id, contentID) {
  return await LbAPI
      .delete(`/links/${id}/content/${contentID}`)
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

async function createContentLink(targetID, categoryID, description, linkGroupID) {
  let targetType;
  switch (categoryID) {
    case 'Locations':
      targetType = 'Location';
    break;
    case 'Characters':
      targetType = 'Character';
    break;
    case 'Events':
      targetType = 'Events';
    break;
    default:
      targetType = 'Entry';
    break;
  };
  const bodyToSend = {
    targetID,
    targetType,
    description,
    linkGroupID
  };
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

export {
  createLinkGroup,
  updateLinkGroup,
  deleteLinkGroup,
  deleteContentLink,
  updateContentLink,
  createContentLink
};