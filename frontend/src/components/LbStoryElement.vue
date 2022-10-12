<template>
  <div class="lb-story-element">
    <div class="lb-story-element__header">
      <div class="lb-story-element__header-part">
        <span class="lb-story-element__link" @click="navigateToStory">{{ title }}</span>
        <span class="lb-story-element__vertical-line"></span>
        <span class="lb-story-element__count">{{ chapterCountText }}</span>
      </div>
      <div class="lb-story-element__header-part">
        <lb-button variant="negative" icon="lb-trash" :size="1.05" @click="deleteStory"></lb-button>
      </div>
    </div>
    <div class="util__horizontal-line--white"></div>
    <div class="lb-story-element__content">
      <label class="lb-story-element__description-label">
        Description
      </label>
      <lb-editable-text :maxLength="500"
                        noContent="No Description"
                        type="textarea"
                        width="100%"
                        :value="description"
                        @onSave="changeDescription">
      </lb-editable-text>
    </div>
  </div>
</template>

<script>
import LbEditableText from './LbEditableText.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'LbStoryElement',
  components: {
    LbEditableText
  },
  emits: ['onDelete'],
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    initDescription: {
      type: String,
      default: ''
    },
    chapterCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      description: this.initDescription
    };
  },
  computed: {
    ...mapGetters('universe', ['universeID']),
    navigateToStory() {
      this.$router.push({
        name: 'StoryPage',
        params: {
          universeID: this.universeID,
          storyID: this.id
        }
      });
    },
    chapterCountText() {
      return `${this.chapterCount} Chapters`;
    }
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    changeDescription(newDescription) {
      try {
        this.description = newDescription;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    deleteStory() {
      this.$emit('onDelete', this.id);
    }
  }
}
</script>

<style lang="less">
@import '../common.less';

.lb-story-element {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: @secondary-color;
  padding: 0.5em;
  border-radius: 10px;

  .lb-story-element__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0.2em;

    .lb-story-element__header-part {
      display: flex;
      align-items: center;
      gap: 5px;

      .lb-story-element__link {
        font-size: 1.5rem;
        color: @green-light-color;
        cursor: pointer;

        &:hover {
          color: @green-shrek-color;
          text-decoration: underline;
        }
      }

      .lb-story-element__vertical-line {
        height: 1.5rem;
        border-right: 1px solid @light-text-color;
      }

      .lb-story-element__count {
        color: @neutral-color;
      }
    }
  }

  .lb-story-element__content {
    display: flex;
    flex-direction: column;
    color: @light-text-color;
    padding: 0.3em;

    .lb-story-element__description-label {
      font-size: 0.9rem;
      color: @neutral-color;
      font-weight: 300;
    }
  }
}

</style>