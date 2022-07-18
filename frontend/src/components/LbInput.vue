<template>
  <div class="lb-input">
    <div class="lb-input__header">
      <h2 class="lb-input__title" v-if="name">{{ name}}</h2>
      <lb-small-error v-if="error.length && !isFocused" :text="error" :size="1.5" />
    </div>
    <input v-model="value"
           :type="type"
           :class="fieldClass"
           :maxlength="maxLength"
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
  emits: ['update:value'],
  props: {
    name: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
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
    margin-bottom: 5px;

    .lb-input__title {
      margin: 0;
      margin-right: 0.5em;
      font-weight: 500;
      color: @light-text-color;
    }
  }

  .lb-input__field {
    border: 2px solid transparent;
    font-size: 1.4rem;
    padding: 0.2em;
    box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.2);

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