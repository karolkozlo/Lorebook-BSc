import LbAPI from "./LbAPI.js";

/**
 *
 * @param {{ title: String }} fields
 * @param { Number } contentID
 */
 async function createImageGroup(fields, contentID) {
    let fieldsToSend = fields;
    fieldsToSend.contentID = contentID;
    return await LbAPI
        .post(`/image_groups/`, fieldsToSend)
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

async function deleteImageGroup(id, contentID) {
  return await LbAPI
      .delete(`/image_groups/${id}/content/${contentID}`)
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
  createImageGroup,
  deleteImageGroup
};