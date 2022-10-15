import LbAPI from "./LbAPI.js";

async function createStory({title, description, universeID}) {
  return await LbAPI
      .post(`/stories`, {title, description, universeID})
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

async function getUniverseStoryList(universeID) {
  return await LbAPI
    .get(`/stories/universe/${universeID}/list`)
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

async function updateStory(id, fields) {
  return await LbAPI
    .patch(`/stories/${id}`, fields)
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

async function deleteStory(id) {
    return await LbAPI
      .delete(`/stories/${id}`)
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
  createStory,
  getUniverseStoryList,
  updateStory,
  deleteStory
};