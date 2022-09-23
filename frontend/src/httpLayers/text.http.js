import LbAPI from "./LbAPI.js";

/**
 *
 * @param {{ title: String, text: String }} fields
 * @param { Number } contentID
 */
async function createText(fields, contentID) {
  let fieldsToSend = fields;
  fieldsToSend.contentID = contentID;
  return await LbAPI
      .post(`/texts/`, fieldsToSend)
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

async function updateText(id, fields, contentID) {
    return await LbAPI
        .patch(`/texts/${id}/content/${contentID}`, fields)
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

async function deleteText(id, contentID) {
  return await LbAPI
      .delete(`/texts/${id}/content/${contentID}`)
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

export {
  createText,
  updateText,
  deleteText
};