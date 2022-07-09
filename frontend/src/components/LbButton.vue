<template>
  <button :class="setStyleClass"
          :style="`font-size: ${this.size}rem;`"
          :disabled="disabled"
          :tabindex="disabled ? -1 : 1"
          @click="$emit('click')">
    <icon v-if="this.icon" :icon="this.icon" :size="this.size" :class="this.getIconCss" />
      <!-- @slot content of the button -->
    <slot/>
  </button>
</template>

<script>
export default {
  name: "LbButton",
  props: {
    variant: {
      type: String,
      default: "default",
      validator(value) {
        return ["default", "positive", "negative", "outline"].includes(value);
      }
    },
    size: {
      type: Number,
      required: false,
      default: null
    },
    icon: {
      type: String,
      required: false
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
  },
  emits: ['click'],
  computed: {
    getIconCss() {
      return this.$slots.default ? "button__icon" : "";
    },
    setStyleClass() {
        if(this.disabled) {
          return `button button--disabled`;
        } else {
          return `button button--${this.variant}`;
        }
    }
  }
}
</script>

<style lang="less">
@import '../common.less';

.button {
  border: 1px solid transparent;
  height: min-content;
  text-align: center;
  align-items: center;
  display: flex;
  border-radius: 10px;
  padding: 0.2rem 0.4rem;
  color: @light-text-color;
  font-weight: 600;
  font-family: 'Roboto';

  &:active {
    color: @special-color;
  }
  &__icon {
    margin-right: 0.5rem;
  }
  &--default {
    background-color: @accent-color;
    &:hover, &:focus-visible {
      background-color: @accent-brighter-color;
    }
    &:active {
      background-color:@accent-darker-color;
    }
  }

  &--positive {
    background-color: @positive-color;
    &:hover, &:focus-visible {
      background-color: @positive-secondary-color;
    }
  }

  &--negative {
    background-color: @negative-color;
    &:hover, &:focus-visible {
      background-color: @negative-secondary-color;
    }
  }

  &--outline {
    color: @dark-text-color;
    background-color: transparent;
    border-color: @dark-text-color;
    &:hover, &:focus-visible {
      background-color: fade(@neutral-color, 30);
      border-color: transparent;
    }
    &:active {
      border-color: @dark-text-color;
      color: @dark-text-color;
    }
  }

  &--disabled {
    background-color: @neutral-color;
    color: @neutral-secondary-color;
    &:active {
      color: @neutral-secondary-color;
    }
  }
}
</style>
