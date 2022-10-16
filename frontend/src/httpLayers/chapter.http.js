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
}

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

async function updateChapter(id, chapterTextPatch) {
  let chapterToPatch =  {
    textPatch: chapterTextPatch,
  };
  await LbAPI.patch(`${url}/${id}`, chapterToPatch)
  .then((response) => {
    console.log("Chapter patched");
  }).catch((err) => {
    if (err.response) {
      throw new Error(`${err.response.data.message}`);
    } else if (err.request) {
      throw new Error("Service refused connection");
    } else {
      throw new Error("Undefined error");
    }
  });

}

export { updateChapter, createChapter, getChapter };