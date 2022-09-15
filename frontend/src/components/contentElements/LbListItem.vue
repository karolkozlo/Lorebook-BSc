<template>
  <div class="lb-list-item">
    <div class="lb-list-item__header">
      <lb-editable-text
        :value="title"
        :maxLength="45"
        :width="'100%'"
        @onSave="saveTitle"
        customClass="lb-list-item__title">
      </lb-editable-text>
      <div class="lb-list-item__header-buttons">
        <lb-button icon="lb-up" :disabled="isUpBtnDisabled" @click="moveListItem(-1)" :size="1">
        </lb-button>
        <lb-button icon="lb-down" :disabled="isLast" @click="moveListItem(1)" :size="1">
        </lb-button>
        <lb-button variant="negative" icon="lb-trash" @click="$emit('removeListItem', id)" :size="1">
        </lb-button>
      </div>
    </div>
    <div class="lb-list-item__body">
      <lb-editable-text :value="text" type="textarea" width="100%" @onSave="saveText"></lb-editable-text>
    </div>
  </div>
</template>

<script>
import LbEditableText from "@/components/LbEditableText.vue";
import { mapMutations } from 'vuex';
import {
  updateListItem
} from '@/httpLayers/list.http.js';

export default {
  name: "LbListItem",
  components: {
    LbEditableText
  },
  emits: ['removeListItem', 'moveItem'],
  props: {
    id: {
      type: Number,
      required: true
    },
    ordinalNumber: {
      type: Number,
      required: true
    },
    contentID: {
      type: Number,
      required: true
    },
    initTitle: {
      type: String,
    },
    initText: {
      type: String
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: this.initTitle,
      text: this.initText
    };
  },
  computed: {
    isUpBtnDisabled() {
      return this.ordinalNumber == 0;
    }
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    moveListItem(change) {
       this.$emit('moveItem', {
        oldOrdinalNumber: this.ordinalNumber,
        newOrdinalNumber: this.ordinalNumber + change
      });
    },
    async saveText(newText) {
      try {
        await updateListItem(this.id, {text: newText}, this.contentID);
        this.text = newText;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async saveTitle(newTitle) {
      try {
        await updateListItem(this.id, {title: newTitle}, this.contentID);
        this.title = newTitle;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
  }
};
</script>

<style lang="less">
@import "../../common.less";

.lb-list-item {
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  &:hover {
    .lb-list-item__header {
      .lb-list-item__header-buttons {
        visibility: visible;
      }
    }
  }

  .lb-list-item__header {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .lb-list-item__title {
      .lb-editable-text__text, .lb-editable-text__input {
        font-size: 1.3rem;
        font-weight: 500;
      }
    }

    .lb-list-item__header-buttons {
      display: flex;
      gap: 10px;
      visibility: hidden;
    }
  }
}
</style>