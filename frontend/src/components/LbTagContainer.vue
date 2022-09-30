<template>
  <div class="lb-tag-container">
    <div class="lb-tag-container__content" :style="visibility">
      <div class="lb-tag-container__tags" v-if="tags.length">
        <div class="lb-tag-container__tag" v-for="(tag, index) in tags" :key="index">
          <span class="lb-tag-container__tag-name">
            {{ tag.name }}
          </span>
          <icon icon="lb-cancel-circled" class="lb-tag-container__icon" @click="$emit('removeTag', tag.id)"></icon>
        </div>
      </div>
      <div class="lb-tag-container__no-content" v-if="tags.length < 1">
        No tags
      </div>
    </div>
    <lb-spinner v-if="loading"></lb-spinner>
    <div class="lb-tage-container__input-field" v-if="!loading">
      <lb-input :maxLength="60" v-model:value="name" :fontSize="1"></lb-input>
      <lb-button variant="positive" icon="lb-plus" :size="1" @click="addTag" :loading="buttonLoading"></lb-button>
    </div>
  </div>
</template>

<script>
import LbInput from './LbInput.vue';

export default {
  name: 'LbTagContainer',
  components: {
    LbInput
  },
  emits: ['addTag', 'removeTag'],
  props: {
    tags: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false
    },
    buttonLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibility() {
      return this.loading ? 'visibility: hidden;' : 'visibility: visible;';
    }
  },
  data() {
    return {
      name: ''
    };
  },
  methods: {
    addTag() {
      if (this.name.length !== 0) {
        const tagExists = this.tags.find(t => (t.name === this.name));
        if (tagExists == undefined) {
          this.$emit('addTag', this.name);
        }
        this.name = '';
      }
    }
  }
};
</script>

<style lang="less">
@import '../common.less';

.lb-tag-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: @secondary-color;
  border-radius: 5px;
  padding: 0.3em;

  .lb-tag-container__content {
    display: flex;
    flex-direction: column;

    .lb-tag-container__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding-bottom: 0.5em;

      .lb-tag-container__tag {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 3px;
        color: @dark-text-color;
        background-color: @canvas-white-color;
        border-radius: 3px;
        padding: 0.2em;

        .lb-tag-container__icon {
          visibility: hidden;
          color: @negative-color;

          &:hover {
            color: @negative-secondary-color
          }
        }

        &:hover {
          .lb-tag-container__icon {
            visibility: visible;
          }
        }
      }
    }

    .lb-tag-container__no-content {
      display: flex;
      justify-content: center;
      text-align: center;
      width: 100%;
      padding-bottom: 0.5em;
      font-style: italic;
      color: @light-text-color;
    }
  }

  .lb-tage-container__input-field {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

</style>