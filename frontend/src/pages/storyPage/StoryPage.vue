<template>
  <div class="story-page">
    <div class="story-page__header">
      <lb-editable-text :value="storyTitle" :maxLength="80" customClass="story-page__title" @onSave="changeStoryTitle"/>
      <label class="story-page__header-label">Description</label>
      <lb-editable-text :value="storyDescription"
                        :maxLength="500"
                        type="textarea"
                        customClass="story-page__description"
                        @onSave="changeStoryDescription"
                        noContent="No description"/>
    </div>
    <div class="story-page__chapter-list">
      <div class="story-page__chapter-list-header">
        List of Chapters
      </div>
      <div class="util__horizontal-line--black"></div>
      <story-chapters :initChapters="chapters" :loading="chaptersLoading" :storyID="storyID"></story-chapters>
    </div>
  </div>
</template>

<script>
import LbEditableText from '@/components/LbEditableText.vue';
import StoryChapters from './StoryChapters.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'StoryPage',
  components: {
    LbEditableText,
    StoryChapters
  },
  props: {
    storyID: {
      type: String,
    }
  },
  data() {
    return {
      storyTitle: 'Some Title',
      storyDescription: 'Some Description',
      chapters: [
        {
          id: '1',
          title: 'Testowy Chapter',
          description: 'testowy opis',
          ordinalNumber: 0
        },
        {
          id: '2',
          title: 'Inny Chapter',
          description: '',
          ordinalNumber: 1
        }
      ],
      chaptersLoading: false
    };
  },
  computed: {
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    async changeStoryTitle(newTitle) {
      try {
        this.storyTitle = newTitle;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async changeStoryDescription(newDescription) {
      try {
        this.storyDescription = newDescription;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
  }
}
</script>

<style lang="less">
@import '../../common.less';

.story-page {
  display: flex;
  flex-direction: column;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 1em;
  gap: 1em;

  .story-page__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .story-page__title {
      font-weight: 600;
      width: 1000px;

      .lb-editable-text__text, .lb-editable-text__input {
        font-size: 2rem;
        text-align: center;
      }
    }

    .story-page__description {
      margin-top: 2px;
      width: 1000px;
    }

    .story-page__header-label {
      width: 100%;
      text-align: start;
      font-size: 0.9rem;
      color: @secondary-color;
    }
  }

  .story-page__chapter-list {
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 0.5em;

    .story-page__chapter-list-header {
      font-size: 1.7rem;
      font-weight: 500;
    }
  }
}

</style>