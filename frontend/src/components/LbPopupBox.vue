<template>
    <lb-popper :isOpen="isOpen">
        <div v-if="isOpen" :class="setVariantClass">
            <div class="lb-popup-box__header">
                <div class="lb-popup-box__title">
                    {{ title }}
                </div>
                <div class="lb-popup-box__close-window-block">
                    <icon :id="`lb-popup-box__close-button`" @click="$emit('close')" icon="lb-cancel-circled" :size=1.5 />
                </div>
            </div>
            <div class="lb-popup-box__content">
                <slot>
                    <span class="lb-popup-box__message">
                        {{message}}
                    </span>
                </slot>
            </div>
        </div>
    </lb-popper>
</template>

<script>
import LbPopper from './LbPopper.vue'

export default {
  components: { LbPopper },
    name: "LbPopupBox",
    emits: ['close'],
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "Title",
        },
        message: {
            type: String,
            default: "Message text"
        },
        variant: {
            type: String,
            default: "default",
            validator(value) {
                return ["negative", "positive", "default"].includes(value);
            }
        }
    },
    computed: {
    setVariantClass() {
      return `lb-popup-box lb-popup-box--${this.variant}`;
    }
  }
}
</script>


<style lang="less">
@import '../common.less';

.lb-popup-box {
    display: flex;
    background-color: @tertiary-color;
    min-width: 400px;
    flex-direction: column;
    font-size: 1.5rem;
    border-radius: 5px;
    color: @light-text-color;
    overflow-wrap: anywhere;

    .lb-popup-box__header {
        display: flex;
        padding: 0.2em;
        justify-content: space-between;
        align-items: center;
        background-color: @primary-color;
        border-radius: 5px 5px 0 0;

        .lb-popup-box__title{
            order: 1;
            text-align: left;
            padding: 0.2em;
            font-family: 'Roboto';
            width: 100%;
        }

        .lb-popup-box__close-window-block {
            order: 2;
            padding: 0.2em;
            cursor: pointer;

            &:hover {
                color: @neutral-color;
            }
        }

    }

    .lb-popup-box__content{
        padding: 1em;
        overflow-wrap: anywhere;
        font-size: 1.125rem;

        .lb-popup-box__message {
            font-family: 'Roboto';
        }
    }

    &--negative {
        background-color: @negative-tertiary-color;

        .lb-popup-box__header {
            background-color: @negative-color;
        }

        .lb-popup-box__content {
            color: @dark-text-color;
        }
    }

    &--positive {
        background-color: @positive-tertiary-color;

        .lb-popup-box__header {
            background-color: @positive-color;
        }

        .lb-popup-box__content {
            color: @dark-text-color;
        }
    }
}
</style>
