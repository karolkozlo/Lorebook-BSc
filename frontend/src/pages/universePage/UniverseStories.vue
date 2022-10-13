<template>
  <div class="universe-stories">
    <div class="universe-stories__header">
      <div class="universe-stories__header-part"></div>
      <div class="universe-stories__header-part universe-stories__header-part--title">
        Your Stories
      </div>
      <div class="universe-stories__header-part">
        <lb-button icon="lb-plus" :size="1.2" @click="openPopup">Create new Story</lb-button>
      </div>
    </div>
    <div class="universe-stories__list">
      <div class="util__horizontal-line--black"></div>
      <div class="universe-stories__list-elements" :style="storiesListVisibility">
        <lb-story-element v-for="(story, index) in storiesList" :key="index"
                          :id="story.id"
                          :title="story.title"
                          :initDescription="story.description"
                          :chapterCount="story.chapterCount"
                          @onDelete="deleteStory">
        </lb-story-element>
        <div class="universe-stories__list--no-content" v-if="storiesList.length == 0">
          No Stories in this Universe
        </div>
      </div>
      <lb-spinner v-if="loading"></lb-spinner>
    </div>
    <create-story-popup v-if="isPopupOpen" :isOpen="isPopupOpen" @close="closePopup" @onResult="addStory"></create-story-popup>
  </div>
</template>

<script>
import CreateStoryPopup from '@/popups/CreateStoryPopup.vue';
import LbStoryElement from '@/components/LbStoryElement.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'UniverseStories',
  components: {
    CreateStoryPopup,
    LbStoryElement
  },
  data() {
    return {
      loading: false,
      storiesList: [
        {
          id: 1,
          title: 'Some story with this title',
          description: 'Description of this story',
          chapterCount: 5
        },
        {
          id: 2,
          title: 'Another story with this title',
          description: '',
          chapterCount: 5
        },
      ],
      isPopupOpen: false
    };
  },
  computed: {
    storiesListVisibility() {
      return this.loading ? 'visibility: hidden;' : '';
    }
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    addStory(newStory) {
      const storyToAdd = {...newStory};
      storyToAdd.chapterCount = 0;
      this.storiesList.push(storyToAdd);
    },
    deleteStory(id) {
      const chapterCount = this.storiesList.find(s => (s.id === id)).chapterCount;
      try {
        if (chapterCount > 0) {
          if (confirm('Do you really want delete this story? This cannot be undone.')) {
            this.storiesList = this.storiesList.filter(s => (s.id !== id));
          }
        } else {
          this.storiesList = this.storiesList.filter(s => (s.id !== id));
        }
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    }
  }
}
</script>

<style lang="less">
@import '../../common.less';

.universe-stories {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
  gap: 1em;
  max-width: 100%;

  .universe-stories__header {
    display: flex;
    align-items: center;
    width: 90%;

    .universe-stories__header-part {
      display: flex;
      flex: 1;
      justify-content: flex-end;

      &--title {
        justify-content: center;
        font-size: 2rem;
        font-weight: 600;
      }
    }
  }

  .universe-stories__list {
    display: flex;
    flex-direction: column;
    width: 90%;
    position: relative;

    .universe-stories__list-elements {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0.2em;
      gap: 0.7em;

      .universe-stories__list--no-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3em 6em;
        border-radius: 10px;
        background-color: @secondary-color;
        color: @light-text-color;
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
  }
}

</style>