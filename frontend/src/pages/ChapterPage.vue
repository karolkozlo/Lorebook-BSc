<template>
  <div class="chapter-page">
    <div class="chapter-page__side-panel">
      <div class="chapter-page__side-panel-content" :style="sidePanelVisibility">
        <h2 class="chapter-page__side-panel-header-text">
          Links in Chapter
        </h2>
        <div class="util__horizontal-line--white"></div>
        <lb-button icon="lb-link" :size="1.1" @click="openLinkPopup">Add new link</lb-button>
        <div class="chapter-page__side-panel-links" v-if="links.length">
          <lb-chapter-link v-for="(link, index) in links" :key="index"
                           v-bind="link"
                           :chapterID="parseInt(chapterID)"
                           @showLink="openChapterLinkPopup">
          </lb-chapter-link>
        </div>
        <div class="chapter-page__side-panel-no-links" v-if="!links.length">
          No links
        </div>
        <div class="chapter-page__side-panel-bottom">
          <lb-button icon="lb-trash" variant="negative" :size="1.2" @click="removeChapter" :loading="chapterRemoveLoading">Remove chapter</lb-button>
        </div>
      </div>
      <lb-spinner v-if="linksLoading"></lb-spinner>
    </div>
    <div class="chapter-page__main">
      <div class="chapter-page__main-header">
        <lb-editable-text :value="title"
                          :maxLength="80"
                          customClass="chapter-page__title"
                          class="chapter-page__title-container"
                          @onSave="changeChapterTitle"/>
        <label class="chapter-page__main-header-label">Description</label>
        <lb-editable-text :value="description"
                          :maxLength="500"
                          type="textarea"
                          class="chapter-page__description-container"
                          customClass="chapter-page__description"
                          @onSave="changeChapterDescription"
                          noContent="No description"/>
      </div>
      <div class="chapter-page__main-content">
        <rich-editor
          :content="chapterText"
          :saveLoading="saveLoading"
          @update="updateChapterText"
          @save="saveChapterText">
        </rich-editor>
      </div>
    </div>
    <link-popup v-if="isLinkPopupOpen"
                :chapterID="parseInt(chapterID)"
                @onResult="addNewLink">
    </link-popup>
    <chapter-link-popup v-if="isChapterLinkPopupOpen"
                        :isOpen="isChapterLinkPopupOpen"
                        v-bind="linkInPopup"
                        @changeDescription="changeLinkDescription"
                        @deleteLink="deleteLink"
                        @close="closeChapterLinkPopup">
    </chapter-link-popup>
  </div>
</template>

<script>
import RichEditor from "../components/RichEditor.vue";
import { createPatch } from "diff";
import { getChapter, updateChapter, deleteChapter } from "../httpLayers/chapter.http.js";
import { getChapterLinks } from "@/httpLayers/link.http.js";
import { mapMutations, mapGetters } from 'vuex';
import LbEditableText from '@/components/LbEditableText.vue';
import LinkPopup from '@/popups/LinkPopup.vue';
import LbChapterLink from '@/components/LbChapterLink.vue';
import ChapterLinkPopup from '@/popups/ChapterLinkPopup.vue';

export default {
  name: "App",
  components: {
    RichEditor,
    LbEditableText,
    LinkPopup,
    LbChapterLink,
    ChapterLinkPopup
  },
  props: {
    chapterID: {
      type: String,
    },
    storyID: {
      type: String,
    }
  },
  data() {
    return {
      title: '',
      description: '',
      chapterText: {
        type: "doc",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
      oldChapterText: {
        type: "doc",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
      saveLoading: false,
      linksLoading: false,
      links: [],
      linkInPopup: null,
      isChapterLinkPopupOpen: false,
      chapterRemoveLoading: false,
    };
  },
  computed: {
    ...mapGetters('popups', ['isLinkPopupOpen']),
    ...mapGetters('universe', ['universeID']),
    sidePanelVisibility() {
      return this.linksLoading ? 'visibility: hidden;' : 'visibility: visible;';
    }
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    ...mapMutations('popups', ['openLinkPopup']),
    updateChapterText(newText) {
      this.chapterText = newText;
    },
    async saveChapterText() {
      this.saveLoading = true;
      const patch = createPatch("newText", JSON.stringify(this.oldChapterText), JSON.stringify(this.chapterText));
      try {
        await updateChapter(this.chapterID, {textPatch: patch});
        this.oldChapterText = this.chapterText;
      } catch(error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      } finally {
        this.saveLoading = false;
      }
    },
    async fetchChapter() {
      try {
        const fetchedChapter = await getChapter(this.chapterID);
        this.chapterText = fetchedChapter.text;
        this.title = fetchedChapter.title;
        this.description = fetchedChapter.description;
        this.oldChapterText = this.chapterText;
      } catch(error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async fetchChapterLinks() {
      try {
        this.linksLoading = true;
        this.links = await getChapterLinks(this.chapterID);
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      } finally {
        this.linksLoading = false;
      }
    },
    async changeChapterTitle(newValue) {
      try {
        await updateChapter(this.chapterID, {title: newValue});
        this.title = newValue;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async changeChapterDescription(newValue) {
      try {
        await updateChapter(this.chapterID, {description: newValue});
        this.description = newValue;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    addNewLink(newLink) {
      this.links.push(newLink);
    },
    openChapterLinkPopup(linkID) {
      this.linkInPopup = this.links.find(link => (link.id === linkID));
      this.isChapterLinkPopupOpen = true;
    },
    closeChapterLinkPopup() {
      this.isChapterLinkPopupOpen = false;
      this.linkInPopup = null;
    },
    changeLinkDescription(change) {
      try {
        const { id, newValue } = change;
        const link = this.links.find(link => (link.id === id));
        link.description = newValue;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    deleteLink(id) {
      try {
        this.links = this.links.filter(link => (link.id !== id));
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async removeChapter() {
      try {
        this.chapterRemoveLoading = true;
        await deleteChapter(this.chapterID);
        this.$router.replace({
          name: 'StoryChaptersPage',
          params: {
            universeID: this.universeID,
            storyID: this.storyID
          }
        });
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      } finally {
        this.chapterRemoveLoading = false;
      }
    }
  },
  async mounted() {
    await this.fetchChapter();
    await this.fetchChapterLinks();
  }
};
</script>

<style lang="less">
@import "../common.less";

.chapter-page {
  display: flex;
  width: 100%;
  min-height: 95vh;

  .chapter-page__side-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ~"max(15%, 200px)";
    background-color: @primary-side-color;
    padding: 0.5em 0.2em;

    .chapter-page__side-panel-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 0.5em;

      .chapter-page__side-panel-header-text {
        margin: 0;
        color: @light-text-color;
      }

      .chapter-page__side-panel-links {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 3px;
        overflow-y: auto;
        max-height: 80vh;
      }

      .chapter-page__side-panel-no-links {
        display: flex;
        width: 100%;
        text-align: center;
      }

      .chapter-page__side-panel-bottom {
        position: fixed;
        bottom: 1em;
      }
    }
  }

  .chapter-page__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 1em;
    position: relative;

    .chapter-page__main-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
      padding-bottom: 2em;

      .chapter-page__title-container {
        width: 100%;
      }

      .chapter-page__title {
        font-weight: 600;
        width: 100%;

        .lb-editable-text__text, .lb-editable-text__input {
          font-size: 2rem;
          text-align: center;
          width: 100%;
        }
      }

      .chapter-page__description-container {
        width: 100%;
      }

      .chapter-page__description {
        width: 100%;
      }

      .chapter-page__main-header-label {
        width: 100%;
        text-align: start;
        font-size: 0.9rem;
        color: @secondary-color;
      }
    }

    .chapter-page__main-content {
      display: flex;
      justify-content: center;
      flex: 1;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
