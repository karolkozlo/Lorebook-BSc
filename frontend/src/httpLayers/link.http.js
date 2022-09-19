import LbAPI from "./LbAPI.js";

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

export {
  updateLinkGroup,
  deleteContentLink,
  updateContentLink
};