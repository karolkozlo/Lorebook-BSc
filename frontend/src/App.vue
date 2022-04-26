<template>
  <main>
    <button @click="postChapter" class="main__post-btn">Post Chapter</button>
    <rich-editor
      :content="chapterText"
      @update="updateChapterText"
      @save="saveChapterText"
    ></rich-editor>
  </main>
</template>

<script>
import RichEditor from "./components/RichEditor.vue";
import { createPatch, applyPatch } from "diff";
import { createChapter } from "./httpLayers/chapter.http.js";
//const Diff = require('diff');

export default {
  name: "App",
  components: {
    RichEditor,
  },
  data() {
    return {
      chapterText: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
              },
            ],
          },
        ],
      },
      savedChapterText: {
        type: "doc",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
    };
  },
  methods: {
    updateChapterText(newText) {
      this.chapterText = newText;
    },
    saveChapterText() {
      const patch = createPatch(
        "newText",
        JSON.stringify(this.savedChapterText),
        JSON.stringify(this.chapterText)
      );
      this.savedChapterText = applyPatch(JSON.stringify(this.savedChapterText), patch);
      this.chapterText = JSON.parse(this.savedChapterText);
    },
    async postChapter() {
      try {
        let createdChapter = await createChapter();
        this.chapterText = JSON.parse(createdChapter.text);
      } catch(err) {
        console.log(err.message);
      }
    }
  },
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
}

main {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 95vh;

  .main__post-btn {
    display: flex;
    height: min-content;
  }
}
</style>
