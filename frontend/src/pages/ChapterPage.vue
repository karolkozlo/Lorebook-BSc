<template>
  <div class="chapter">
    <button @click="postChapter" class="chapter__post-btn">Post Chapter</button>
    <rich-editor
      :content="chapter.text"
      @update="updateChapterText"
      @save="saveChapterText">
    </rich-editor>
  </div>
</template>

<script>
import RichEditor from "../components/RichEditor.vue";
import { createPatch, applyPatch } from "diff";
import { createChapter, getChapter, updateChapter } from "../httpLayers/chapter.http.js";

export default {
  name: "App",
  components: {
    RichEditor,
  },
  props: {
    chapterID: {
      type: Number,
    }
  },
  data() {
    return {
      chapter: {
        id: null,
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
      },
      oldChapterText: {
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
      this.chapter.text = newText;
    },
    async saveChapterText() {
      const patch = createPatch("newText", JSON.stringify(this.oldChapterText), JSON.stringify(this.chapter.text));
      try {
        await updateChapter(this.chapterID, {textPatch: patch});
        this.oldChapterText = this.chapter.text;
      } catch(err) {
        console.log(err.message);
      }
    },
    async getCurrentChapter() {
      try {
        this.chapter = await getChapter(this.chapterID);
        this.oldChapterText = this.chapter.text;
      } catch(err) {
        console.log(err.message);
      }
    }
  },
  async mounted() {
    await this.getCurrentChapter();
  }
};
</script>

<style lang="less">

.chapter {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 95vh;

  .chatper__post-btn {
    display: flex;
    height: min-content;
  }
}
</style>
