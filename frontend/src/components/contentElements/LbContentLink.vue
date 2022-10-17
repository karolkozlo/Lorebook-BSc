<template>
  <div class="lb-content-link">
    <div class="lb-content-link__header">
      <div class="lb-content-link__header-main">
        <div @click="navigateToElement" class="lb-content-link__title">
          <icon icon="lb-link" class="lb-content-link__title-icon"></icon>
          <span class="lb-content-link__title-text">{{ targetName }}</span>
        </div>
        <div class="lb-content-link__category">
          <icon icon="lb-folder"></icon>
          {{ categoryName }}
        </div>
      </div>
      <div class="lb-content-link__header-buttons">
        <lb-button variant="negative" icon="lb-unlink" @click="$emit('removeLink', id)" :size="1">
        </lb-button>
      </div>
    </div>
    <div class="lb-content-link__body">
      <lb-editable-text :value="description"
        type="textarea"
        :maxLength="250"
        :width="'100%'"
        @onSave="saveDescription">
      </lb-editable-text>
    </div>
  </div>
</template>

<script>
import LbEditableText from "@/components/LbEditableText.vue";
import { mapGetters, mapMutations } from 'vuex';
import {
  updateContentLink
} from '@/httpLayers/link.http.js';

export default {
  name: 'LbContentLink',
  components: {
    LbEditableText,
  },
  emits: ['removeLink'],
  props: {
    contentID: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true
    },
    linkGroupID: {
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
  computed: {
    ...mapGetters('universe', ['universeID']),
    ...mapGetters('element', ['getLinkById']),
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    async saveDescription(newDesc) {
      try {
        await updateContentLink(this.id,  {description: newDesc}, this.contentID);
        const link = this.getLinkById(this.linkGroupID, this.id);
        link.description = newDesc;
      } catch(error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    navigateToElement() {
      this.$router.push({
        name: 'ElementPage',
        params: {
          universeID: this.universeID,
          categoryID: this.categoryID,
          elementID: this.targetID
        }
      });
    }
  }
}
</script>

<style lang="less">
@import '../../common.less';

.lb-content-link {
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  &:hover {
    .lb-content-link__header {
      .lb-content-link__header-buttons {
        visibility: visible;
      }
    }
  }

  .lb-content-link__header {
    display: flex;
    flex: 1;
    gap: 1em;

    .lb-content-link__header-main {
      display: flex;
      align-items: center;
      gap: 1em;

      .lb-content-link__title {
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        font-weight: 600;
        gap: 0.2em;
        cursor: pointer;

        &:hover {
          .lb-content-link__title-text {
            text-decoration: underline;
            color: @accent-darker-color;
          }
          .lb-content-link__title-icon {
            color: @special-color;
          }
        }
      }

      .lb-content-link__category {
        display: flex;
        align-items: center;
        color: @dark-secondary-text-color;
        font-weight: 500;
        gap: 0.2em;
      }
    }

    .lb-content-link__header-buttons {
      visibility: hidden;
    }
  }
}

</style>