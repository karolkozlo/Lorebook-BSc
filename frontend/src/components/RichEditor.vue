<template>
  <div class="rich-editor">
    <div class="rich-editor__menu">
      <button @click="bold">B</button>
      <button @click="italic"><i>I</i></button>
      <button @click="underline"><u>U</u></button>
      <button class="rich-editor__save-btn" @click="$emit('save')">Save</button>
    </div>
    <editor-content class="rich-editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

export default {
  name: "RichEditor",
  components: {
    EditorContent,
  },
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          type: "doc",
          content: [
            {
              type: "paragraph",
            },
          ],
        };
      },
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    bold() {
      this.editor.chain().focus().toggleBold().run();
    },
    italic() {
      this.editor.chain().focus().toggleItalic().run();
    },
    underline() {
      this.editor.chain().focus().toggleUnderline().run();
    },
  },
  watch: {
    content(value) {
      const isSame =
        JSON.stringify(this.editor.getJSON()) === JSON.stringify(value);
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(value, false);
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.content,
      extensions: [StarterKit, Underline],
      onUpdate: () => {
        this.$emit("update", this.editor.getJSON());
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="less">
.rich-editor {
  display: flex;
  background-color: #596d86;
  padding: 0.75em;
  border-radius: 0.5em;
  min-width: 50%;
  max-width: 70%;
  flex-direction: column;

  .rich-editor__menu {
    display: flex;
    padding: 0.3em;
    background-color: #284465;

    .rich-editor__save-btn {
      border: none;
      color: white;
      background-color: #20bd4a;
      border-radius: 0.8em;
      font-size: 1em;
      padding: 0.3em;
      margin-left: auto;

      &:hover {
        background-color: #1ba740;
      }

      &:active {
        font-weight: bold;
        background-color: #168032;
      }
    }
  }

  .rich-editor__content {
    display: flex;
    width: 100%;
    min-height: 95%;

    .ProseMirror {
      width: 100%;
      background-color: #ebebeb;
      padding: 0.4em;
    }
  }
}
</style>