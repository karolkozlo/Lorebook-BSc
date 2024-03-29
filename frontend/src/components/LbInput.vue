<template>
  <div class="lb-input">
    <div class="lb-input__header">
      <h2 class="lb-input__title" :style="setSize.title" v-if="name">{{ name}}</h2>
      <lb-small-error v-if="error.length && !isFocused" :text="error" :size="1.5" />
    </div>
    <input v-if="type !== 'textarea'"
           v-model="value"
           :type="type"
           :class="fieldClass"
           :maxlength="maxLength"
           :style="setSize.input"
           @input="$emit('update:value', value)"
           @change="$emit('change:value', value)"
           @focus="isFocused = true"
           @blur="isFocused = false" />
    <textarea v-else
           v-model="value"
           :class="fieldClass"
           :maxlength="maxLength"
           :style="setSize.textarea"
           @input="$emit('update:value', value)"
           @focus="isFocused = true"
           @blur="isFocused = false" />
  </div>
</template>

<script>
import LbSmallError from './LbSmallError.vue'

export default {
  components: { LbSmallError },
  name: 'LbInput',
  emits: ['update:value', 'change:value'],
  props: {
    name: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number],
      required: true,
    },
    error: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
    },
    minHeight: {
        type: Number,
        default: 150
    },
    fontSize: {
      type: Number,
      default: 1.2
    }
  },
  data() {
    return {
      isFocused: false,
    };
  },
  computed: {
    fieldClass() {
      return this.error.length && !this.isFocused ? 'lb-input__field lb-input__field--invalid' : 'lb-input__field';
    },
    setSize() {
      return {
        title: `font-size: ${this.fontSize + 0.2}rem;`,
        input: `font-size: ${this.fontSize}rem;`,
        textarea: `font-size: ${this.fontSize}rem; min-height: ${this.minHeight}px;`
      }
    }
  }
};
</script>

<style lang="less">
@import '../common.less';

.lb-input {
  display: flex;
  flex-direction: column;
  width: 100%;

  .lb-input__header {
    display: flex;
    align-items: center;

    &:has(.lb-input__title) {
      margin-bottom: 5px;
    }

    .lb-input__title {
      margin: 0;
      margin-right: 0.5em;
      font-weight: 500;
      color: @light-text-color;
    }
  }

  .lb-input__field {
    border: 2px solid transparent;
    padding: 0.2em;
    box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.2);
    resize: vertical;
    width: 100%;

    &:focus {
      background-color: @neutral-secondary-color;
      box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.2);
      border: 2px solid @neutral-color;
    }

    &.lb-input__field--invalid {
      border-color: @negative-color;
    }
  }
}
</style>