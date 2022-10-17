<template>
  <div class="story-chapters-page">
    <div class="story-chapters-page__header" :style="storyLoadingVisibility">
      <lb-editable-text :value="storyTitle" :maxLength="80" customClass="story-chapters-page__title" @onSave="changeStoryTitle"/>
      <label class="story-chapters-page__header-label">Description</label>
      <lb-editable-text :value="storyDescription"
                        :maxLength="500"
                        type="textarea"
                        customClass="story-chapters-page__description"
                        @onSave="changeStoryDescription"
                        noContent="No description"/>
    </div>
    <lb-spinner v-if="storyLoading"></lb-spinner>
    <div class="story-chapters-page__chapter-list">
      <div class="story-chapters-page__chapter-list-header">
        List of Chapters
      </div>
      <div class="util__horizontal-line--black"></div>
      <story-chapters v-if="canShowChapters" :storyID="storyID"></story-chapters>
    </div>
  </div>
</template>

<script>
import LbEditableText from '@/components/LbEditableText.vue';
import StoryChapters from './StoryChapters.vue';
import { mapMutations, mapGetters } from 'vuex';
import { getStory, updateStory } from '@/httpLayers/story.http.js';


export default {
  name: 'StoryChaptersPage',
  components: {
    LbEditableText,
    StoryChapters
  },
  props: {
    storyID: {
      type: String,
    },
    universeID: {
      type: String
    }
  },
  data() {
    return {
      storyTitle: '',
      storyDescription: '',
      storyLoading: true,
      canShowChapters: false
    };
  },
  computed: {
    storyLoadingVisibility() {
      return this.storyLoading ? 'visibility: hiddden;' : 'visibility: visible';
    }
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    async changeStoryTitle(newTitle) {
      try {
        await updateStory(this.storyID, {title: newTitle});
        this.storyTitle = newTitle;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async changeStoryDescription(newDescription) {
      try {
        await updateStory(this.storyID, {description: newDescription});
        this.storyDescription = newDescription;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async fetchStory() {
      try {
        this.storyLoading = true;
        const fetchedStory = await getStory(this.storyID);
        if (this.universeID != fetchedStory.Universe_id) {
          throw new Error('This story does not belong to this universe');
        } else {
          this.storyDescription = fetchedStory.description;
          this.storyTitle = fetchedStory.title;
          return true;
        }
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
        this.$router.replace({ name: 'UniverseMainPage', params: { universeID: this.universeID }});
      } finally {
        this.storyLoading = false;
      }
    },
  },
  async mounted() {
    this.canShowChapters = await this.fetchStory();
  }
}
</script>

<style lang="less">
@import '../../common.less';

.story-chapters-page {
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 1em;
  gap: 1em;

  .story-chapters-page__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .story-chapters-page__title {
      font-weight: 600;
      width: 1000px;

      .lb-editable-text__text, .lb-editable-text__input {
        font-size: 2rem;
        text-align: center;
      }
    }

    .story-chapters-page__description {
      margin-top: 2px;
      width: 1000px;
    }

    .story-chapters-page__header-label {
      width: 100%;
      text-align: start;
      font-size: 0.9rem;
      color: @secondary-color;
    }
  }

  .story-chapters-page__chapter-list {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 0.5em;

    .story-chapters-page__chapter-list-header {
      font-size: 1.7rem;
      font-weight: 500;
    }
  }
}

</style>