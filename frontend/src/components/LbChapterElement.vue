<template>
  <div class="lb-chapter-element">
    <div class="lb-chapter-element__header">
      <div class="lb-chapter-element__header-part">
        <div class="lb-chapter-element__title">
          {{ title }}
        </div>
      </div>
      <div class="lb-chapter-element__header-part">
        <div class="lb-chapter-element__buttons">
          <div class="lb-chapter-element__position-buttons">
            <lb-button icon="lb-up" :size="1.05" :disabled="ordinalNumber == 0" @click="moveChapter(-1)"></lb-button>
            <lb-button icon="lb-down" :size="1.05" :disabled="isLast" @click="moveChapter(1)"></lb-button>
          </div>
          <lb-button icon="lb-trash" variant="negative" :size="1.05" @click="deleteChapter"></lb-button>
        </div>
      </div>
    </div>
    <div class="util__horizontal-line--white"></div>
    <div class="lb-chapter-element__content">
      <label class="lb-chapter-element__description-label">
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

export default {
  name: 'LbChapterElement',
  components: {
    LbEditableText
  },
  emits: ['changeDescription', 'moveChapter', 'deleteChapter'],
  props: {
    id: {
      type: String,
      require: true
    },
    title: {
      type: String,
    },
    ordinalNumber: {
      type: Number
    },
    description: {
      type: String
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeDescription(newValue) {
      this.$emit('changeDescription', {
        id: this.id,
        newValue: newValue
      });
    },
    moveChapter(change) {
      this.$emit('moveChapter', {
        oldOrdinalNumber: this.ordinalNumber,
        newOrdinalNumber: this.ordinalNumber + change
      });
    },
    deleteChapter() {
      this.$emit('deleteChapter', this.id);
    }
  }
}
</script>

<style lang="less">
@import '../common.less';

.lb-chapter-element {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: @secondary-color;
  border-radius: 10px;
  padding: 0.5em;
  color: @light-text-color;

  .lb-chapter-element__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.2em;

    .lb-chapter-element__header-part {
      display: flex;
      align-items: center;
      gap: 5px;

      .lb-chapter-element__title {
        font-size: 1.5rem;
        font-weight: 500;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .lb-chapter-element__buttons {
      display: flex;
      gap: 10px;

      .lb-chapter-element__position-buttons {
        display: flex;
        gap: 5px;
      }
    }
  }

  .lb-chapter-element__content {
    display: flex;
    flex-direction: column;
    color: @light-text-color;
    padding: 0.3em;

    .lb-chapter-element__description-label {
      font-size: 0.9rem;
      color: @neutral-color;
      font-weight: 300;
    }
  }
}

</style>