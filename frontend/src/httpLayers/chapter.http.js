import LbAPI from "./LbAPI";

const url = "/chapters";

const defaultChapterText = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

function chaptersMapper(chapters) {
  return chapters.map(ch => {
    return {
      id: ch.id,
      title: ch.title,
      description: ch.description,
      ordinalNumber: ch.ordinal_number
    };
  });
};

async function getChapter(id) {
    return LbAPI.get(`${url}/${id}`)
    .then((response) => {
      let chapterToGet = {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        text: response.data.text,
        ordinalNumber: response.data.ordinal_number,
        storyID: response.data.Story_id
      };
      return chapterToGet;
    })
    .catch((err) => {
      if (err.response) {
        throw new Error(`${err.message}`);
      } else if (err.request) {
        throw new Error("Service refused connection");
      } else {
        throw new Error("Undefined error");
      }
    });
};

async function getStoryChapters(storyID) {
  return await LbAPI
  .get(`/chapters/story/${storyID}`)
  .then((response) => {
    return chaptersMapper(response.data);
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

async function createChapter(title, description, ordinalNumber, storyID) {
    const chapterToPost =  {
        title: title,
        description: description,
        text: defaultChapterText,
        ordinalNumber: ordinalNumber,
        storyID: storyID
    };
    return LbAPI
    .post('/chapters', chapterToPost)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response) {
        throw new Error(`${err.message}`);
      } else if (err.request) {
        throw new Error("Service refused connection");
      } else {
        throw new Error("Undefined error");
      }
    });
}

// If you want to patch text, add field named "textPatch"
async function updateChapter(id, fields) {
  if (fields.text) {
    throw new Error('Cannot update text directly. You should use "textPatch" field.');
  }
  return await LbAPI.patch(`/chapters/${id}`, fields)
  .then((response) => {
    return true;
  }).catch((err) => {
    if (err.response) {
      throw new Error(`${err.response.data.message}`);
    } else if (err.request) {
      throw new Error("Service refused connection");
    } else {
      throw new Error("Undefined error");
    }
  });
};

// fields {storyID, oldOrdinalNumber, newOrdinalNumber}
async function updateChapterPosition(id, fields,) {
  return await LbAPI
      .patch(`/chapters/position/${id}`, fields)
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

async function deleteChapter(chapterID) {
  return await LbAPI
  .delete(`/chapters/${chapterID}`)
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
  updateChapter,
  createChapter,
  getChapter,
  getStoryChapters,
  updateChapterPosition,
  deleteChapter
};