import LbAPI from "./LbAPI.js";

async function createTagInContent(name, contentID, universeID) {
  return await LbAPI
    .post(`/tags/content`, {name, contentID, universeID})
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

async function deleteTagFromContent(tagID, contentID) {
  return await LbAPI
    .delete(`/tags/${tagID}/content/${contentID}`)
    .then((response) => {
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
  createTagInContent,
  deleteTagFromContent
};