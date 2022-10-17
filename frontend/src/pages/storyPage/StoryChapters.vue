<template>
  <div class="story-chapters">
    <div class="story-chapters__content" v-if="chapters.length">
      <lb-chapter-element v-for="(chapter, index) in sortedChapters" :key="index"
                          :id="chapter.id"
                          :title="chapter.title"
                          :description="chapter.description"
                          :ordinalNumber="chapter.ordinalNumber"
                          :isLast="chapter.ordinalNumber == chapters.length-1"
                          :storyID="storyID"
                          @changeDescription="changeDescription"
                          @deleteChapter="removeChapter"
                          @moveChapter="moveChapter">

      </lb-chapter-element>
    </div>
    <div class="story-chapters__no-content" v-if="chapters.length == 0">
      No chapters
    </div>
    <div class="story-chapters__create-button">
      <lb-button @click="openPopup" :size="1.2" icon="lb-plus">Create new chapter</lb-button>
    </div>
    <lb-spinner v-if="loading"></lb-spinner>
    <create-chapter-popup v-if="isPopupOpen"
                          :isOpen="isPopupOpen"
                          @close="closePopup"
                          :storyID="storyID"
                          :ordinalNumber="newChapterOrdinalNumber"
                          @onResult="addNewChapter">
    </create-chapter-popup>
  </div>
</template>

<script>
import CreateChapterPopup from '@/popups/CreateChapterPopup.vue';
import LbChapterElement from '@/components/LbChapterElement.vue';
import { mapMutations } from 'vuex';
import { getStoryChapters, updateChapter, updateChapterPosition, deleteChapter } from '@/httpLayers/chapter.http.js';

export default {
  name: 'StoryChapters',
  components: {
    CreateChapterPopup,
    LbChapterElement
  },
  props: {
    storyID: {
      type: String,
    }
  },
  data() {
    return {
      isPopupOpen: false,
      chapters: [],
      loading: false
    };
  },
  computed: {
    newChapterOrdinalNumber() {
      return this.chapters.length;
    },
    sortedChapters() {
      return this.chapters.sort((ch1, ch2) => {
        if (ch1.ordinalNumber > ch2.ordinalNumber) return 1;
        if (ch1.ordinalNumber == ch2.ordinalNumber) return 0;
        if (ch1.ordinalNumber < ch2.ordinalNumber) return -1;
      });
    }
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    closePopup() {
      this.isPopupOpen = false;
    },
    openPopup() {
      this.isPopupOpen = true;
    },
    async changeDescription(change) {
      const {id, newValue} = change;
      try {
        const chapter = this.chapters.find(ch => ch.id == id);
        await updateChapter(chapter.id, {description: newValue});
        chapter.description = newValue;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    addNewChapter(newChapter) {
      this.chapters.push(newChapter);
    },
    async moveChapter(order) {
      try {
        const chapter1 = this.chapters.find(ch => ch.ordinalNumber == order.oldOrdinalNumber);
        const chapter2 = this.chapters.find(ch => ch.ordinalNumber == order.newOrdinalNumber);
        await updateChapterPosition(chapter1.id, {
          storyID: this.storyID,
          oldOrdinalNumber: order.oldOrdinalNumber,
          newOrdinalNumber: order.newOrdinalNumber
        });
        chapter1.ordinalNumber = order.newOrdinalNumber;
        chapter2.ordinalNumber = order.oldOrdinalNumber;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async removeChapter(id) {
      try {
        const chapter = this.chapters.find(ch => ch.id == id);
        const position = chapter.ordinalNumber;
        await deleteChapter(chapter.id);
        this.chapters = this.chapters.filter(ch => { return ch.id !== id });
        this.chapters.filter(ch => (ch.ordinalNumber > position))
                  .forEach(ch => {ch.ordinalNumber = ch.ordinalNumber - 1});
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async fetchChapters() {
      this.loading = true;
      try {
        this.chapters = await getStoryChapters(this.storyID);
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      } finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    await this.fetchChapters();
  }
};
</script>

<style lang="less">
@import '../../common.less';

.story-chapters {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  .story-chapters__content {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .story-chapters__no-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: min-content;
    padding: 1.5em 2em;
    background-color: @secondary-color;
    color: @light-text-color;
    font-weight: 500;
    font-size: 1.5rem;
    white-space: nowrap;
    border-radius: 10px;

  }

  .story-chapters__create-button {
    margin-top: 1em;
  }
}

</style>