<template>
  <div class="lb-accordion">
    <div class="lb-accordion__activator">
      <h3 class="lb-accordion__title lb-accordion__title--static" v-if="!isTitleEditable" @click="toggleContent">{{ title }}</h3>
      <lb-editable-text v-if="isTitleEditable"
                        :value="title"
                        :width="'100%'"
                        @onSave="changeTitle"
                        :maxLength="maxLength"
                        :customClass="'lb-accordion__title lb-accordion__title--editable'">
      </lb-editable-text>
      <div class="lb-accordion__activator-right">
        <span class="lb-accordion__activator-subtext" v-if="subtext">
          {{ subtext }}
        </span>
        <div class="lb-accordion__activator-button" @click="toggleContent">
          <icon :icon="toggleButtonIcon" :size="2"></icon>
        </div>
      </div>
    </div>
    <div class="lb-accordion__content" v-if="isOpen">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LbEditableText from './LbEditableText.vue';

export default {
  name: 'LbAccordion',
  components: {
    LbEditableText
  },
  emits: ['changeTitle'],
  props: {
    title: {
      type: String,
      required: true
    },
    isTitleEditable: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number
    },
    subtext: {
      type: String,
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    toggleButtonIcon() {
      return this.isOpen ? 'lb-down' : 'lb-right';
    }
  },
  methods: {
    toggleContent() {
      this.isOpen = !this.isOpen;
    },
    changeTitle(newTitle) {
      this.$emit('changeTitle', newTitle);
    }
  }
};
</script>

<style lang="less">
@import '../common.less';

.lb-accordion {
  display: flex;
  flex-direction: column;
  width: 100%;

  .lb-accordion__activator {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: @secondary-color;
    padding: 1.5em 1em;
    border-radius: 8px;
    gap: 1em;

    .lb-accordion__title {
      margin: 0;
      color: @light-text-color;
      font-size: 1.4rem;
      font-weight: 500;
      cursor: pointer;

      &--static {
        width: 100%;
        &:hover {
          color: @special-color;
        }
      }

      &--editable {
        font-weight: 500;

        .lb-editable-text__input, .lb-editable-text__text {
          font-size: inherit;
        }
      }
    }

    .lb-accordion__activator-right {
      display: flex;
      align-items: center;
      gap: 1em;

      .lb-accordion__activator-subtext {
        font-size: 1.2rem;
        color: @neutral-color;
        text-align: center;
      }

      .lb-accordion__activator-button {
        width: 2rem;
        color: @light-text-color;
        cursor: pointer;

        &:hover {
          color: @special-color;
        }
      }
    }
  }

  .lb-accordion__content {
    background-color: @element-color;
    padding: 0.2em;
    border-radius: 0px 0px 8px 8px;
  }
}

</style>