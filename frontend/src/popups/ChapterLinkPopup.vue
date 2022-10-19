<template>
  <lb-popup-box :isOpen="isOpen" title="Link in Chapter" @close="$emit('close')">
    <div class="chapter-link-popup">
      <div class="chapter-link-popup__header">
        <div class="chapter-link-popup__category-name">
          {{ categoryName }}
        </div>
        <div class="chapter-link-popup__target-name">
          {{ targetName }}
        </div>
        <div class="util__horizontal-line--black"></div>
      </div>
      <div class="chapter-link-popup__content">
        <label class="chapter-link-popup__description-label">
          Description
        </label>
        <lb-editable-text :value="editableDescription"
                          :maxLength="250"
                          type="textarea"
                          class="chapter-link-popup__description-container"
                          customClass="chapter-link-popup__description"
                          @onSave="changeChapterDescription"
                          noContent="No description"/>
        <div class="chapter-link-popup__delete-btn">
          <lb-button icon="lb-unlink" variant="negative" @click="deleteChapterLink" :size="1.2">Remove link from chapter</lb-button>
        </div>
      </div>
    </div>
  </lb-popup-box>
</template>

<script>
import LbEditableText from '@/components/LbEditableText.vue';
import { mapMutations } from 'vuex';
import { deleteLink, updateLink } from '@/httpLayers/link.http.js';

export default {
  name: 'ChapterLinkPopup',
  components: {
    LbEditableText
  },
  emits: ['changeDescription', 'deleteLink', 'close'],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    targetID: {
      type: Number,
      required: true,
    },
    targetName: {
      type: String,
      rquired: true
    },
    categoryID: {
      type: [Number, String],
      required: true
    },
    categoryName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editableDescription: this.description,
      removeLinkLoading: true,
    };
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    async changeChapterDescription(newValue) {
      try {
        await updateLink(this.id, {description: newValue});
        this.editableDescription = newValue;
        this.$emit('changeDescription', {
          id: this.id,
          newValue: this.editableDescription
        });
      } catch (error) {
        this.notify({type: 'negative', message: error.message});
      }
    },
    async deleteChapterLink() {
      try {
        this.removeLinkLoading = true;
        await deleteLink(this.id);
        this.$emit('deleteLink', this.id);
        this.$emit('close');
      } catch (error) {
        this.notify({type: 'negative', message: error.message});
      } finally {
        this.removeLinkLoading = false;
      }
    }
  }
};
</script>

<style lang="less">
@import '../common.less';

.chapter-link-popup {
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 50vw;

  .chapter-link-popup__header {
    display: flex;
    flex-direction: column;
    width: 100%;

    .chapter-link-popup__category-name {
      font-weight: 400;
      color: @secondary-color;
      font-size: 1rem;
    }

    .chapter-link-popup__target-name {
      font-size: 1.6rem;
      color: @dark-text-color;
      font-weight: 500;
    }
  }

  .chapter-link-popup__content {
    display: flex;
    flex-direction: column;
    padding: 0.5em 0.1em;

    .chapter-link-popup__description-label {
      font-size: 0.9rem;
      font-weight: 300;
      color: @secondary-color;
    }

    .chapter-link-popup__description-container {
      width: 100%;

      .chapter-link-popup__description {
        width: 100%;
        color: @dark-text-color;
      }
    }

    .chapter-link-popup__delete-btn {
      display: flex;
      margin-top: 3em;
    }
  }
}

</style>