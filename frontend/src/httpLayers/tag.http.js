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

async function deleteTag(tagID) {
  return await LbAPI
    .delete(`/tags/${tagID}`)
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

async function searchTagList(universeID, query, elementsPerPage, offset) {
  const encodedQuery = encodeURIComponent(query);
  return await LbAPI
        .get(`/tags/search/list/${universeID}/?q=${encodedQuery}&limit=${elementsPerPage}&offset=${offset}`)
        .then((response) => {
          const searchResult = {
            elements: response.data.rows,
            totalPages: Math.ceil(response.data.count / elementsPerPage)
          };
          return searchResult;
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

async function updateTag(tagID, name) {
  return await LbAPI
  .patch(`/tags/${tagID}`, {name})
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
  createTagInContent,
  deleteTag,
  deleteTagFromContent,
  searchTagList,
  updateTag
};