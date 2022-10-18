<template>
  <div class="rich-editor">
    <div class="rich-editor__menu">
      <button class="rich-editor__menu-btn rich-editor__menu-btn--bold" @click="bold">B</button>
      <button class="rich-editor__menu-btn rich-editor__menu-btn--italic" @click="italic">I</button>
      <button class="rich-editor__menu-btn rich-editor__menu-btn--underline" @click="underline">U</button>
      <lb-button class="rich-editor__save-btn" variant="positive" :size="1.1" :loading="saveLoading" @click="$emit('save')">Save</lb-button>
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
    saveLoading: {
      type: Boolean,
      default: false
    }
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
@import '../common.less';

.rich-editor {
  display: flex;
  background-color: @secondary-color;
  padding: 0.75em;
  border-radius: 0.5em;
  width: 80%;
  flex-direction: column;
  height: 90vh;

  .rich-editor__menu {
    display: flex;
    padding: 0.3em;
    gap: 0.5em;
    background-color: @accent-darker-color;
    align-items: center;

    .rich-editor__save-btn {
      margin-left: auto;
    }

    .rich-editor__menu-btn {
      border: none;
      border-radius: 5px;
      color: @light-text-color;
      background-color: transparent;
      font-size: 1.2rem;
      padding: 0.3em 0.5em;
      font-weight: 500;

      &:hover {
        background-color: @accent-color;
      }

      &--italic {
        font-style: italic;
      }

      &--underline {
        text-decoration: underline;
      }

      &--bold {
        font-weight: 700;
      }
    }
  }

  .rich-editor__content {
    display: flex;
    width: 100%;
    min-height: 95%;

    .ProseMirror {
      width: 100%;
      background-color: @canvas-white-color;
      padding: 0.4em;
      overflow-y: auto;
    }
  }
}
</style>