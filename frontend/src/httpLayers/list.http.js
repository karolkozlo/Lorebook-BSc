import LbAPI from "./LbAPI.js";

async function updateList(id, fields, contentID) {
  return await LbAPI
      .patch(`/lists/${id}/content/${contentID}`, fields)
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

// fields {title, text, ordinalNumber, listID, contentID}
async function createListItem(fields) {
  return await LbAPI
      .post(`/list_items/`, fields)
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

async function deleteListItem(id, contentID) {
  return await LbAPI
      .delete(`/list_items/${id}/content/${contentID}`)
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

async function updateListItem(id, fields, contentID) {
  return await LbAPI
      .patch(`/list_items/${id}/content/${contentID}`, fields)
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

// fields {listID, oldOrdinalNumber, newOrdinalNumber}
async function updateListItemPosition(id, fields, contentID) {
  return await LbAPI
      .patch(`/list_items/position/${id}/content/${contentID}`, fields)
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
  updateList,
  createListItem,
  deleteListItem,
  updateListItem,
  updateListItemPosition
};