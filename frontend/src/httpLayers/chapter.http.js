import LbAPI from "./LbAPI";

const url = "/chapters";

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

async function createChapter(chapter) {
    let chapterToPost =  {
        title: chapter.title,
        description: chapter.description,
        text: chapter.text,
        ordinalNumber: chapter.ordinalNumber,
        storyID: chapter.Story_id || chapter.storyID
    };
    return LbAPI
    .post(url, chapterToPost)
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