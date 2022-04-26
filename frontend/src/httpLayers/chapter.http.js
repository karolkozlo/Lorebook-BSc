import LbAPI from "./LbAPI";

async function createChapter() {
    const url = "/chapters";
    const chapter = {
        title: "Tytuł Chaptera",
        description: "Opis Chaptera",
        text: {
            type: "doc",
            content: [
              {
                type: "paragraph",
              },
            ],
          },
        ordinalNumber: 1,
        storyID: 1
    };
    return LbAPI
    .post(url, chapter)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response) {
        throw new Error(`${err.response}`);
      } else if (err.request) {
        throw new Error("Service refused connection");
      } else {
        throw new Error("Undefined error");
      }
    });
}

async function saveChapter() {
    
}

export { saveChapter, createChapter };