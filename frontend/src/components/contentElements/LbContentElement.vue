<template>
  <div class="lb-content-element">
    <div class="lb-content-element__header">
        <lb-editable-text :value="title"
                          :maxLength="60"
                          :width="'100%'"
                          @onSave="changeTitle"
                          customClass="lb-content-element__title">
        </lb-editable-text>
        <div class="lb-content-element__header-buttons">
            <lb-button variant="negative" icon="lb-trash" @click="$emit('removeElement')" :size="1.2"></lb-button>
        </div>
    </div>
    <div class="util__horizontal-line--black"></div>
    <div class="lb-content-element__body">
        <slot/>
    </div>
    <div class="lb-content-element__footer">
        <div class="lb-content-element__footer-buttons">
            <lb-button icon="lb-up" :disabled="isUpBtnDisabled" @click="moveContentElement(-1)" :size="1.1"></lb-button>
            <lb-button icon="lb-down" :disabled="isLast" @click="moveContentElement(1)" :size="1.1"></lb-button>
        </div>
    </div>
  </div>
</template>

<script>
import LbEditableText from '@/components/LbEditableText.vue';

export default {
    name: 'LbContentElement',
    components: {
        LbEditableText
    },
    emits: ['moveElement', 'removeElement', 'changeTitle'],
    props: {
        position: {
            type: Number,
            required: true,
        },
        isLast: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Title'
        }
    },
    computed: {
        isUpBtnDisabled() {
            return this.position - 1 < 0;
        }
    },
    methods: {
        moveContentElement(change) {
            this.$emit('moveElement', this.position + change);
        },
        changeTitle(newTitle) {
            this.$emit('changeTitle', newTitle);
        }
    }
};
</script>

<style lang="less">
@import '../../common.less';

.lb-content-element {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: @element-color;
    border-radius: 10px;
    padding: 0.5em;
    gap: 0.2em;

    &:hover {
        .lb-content-element__footer {
            .lb-content-element__footer-buttons {
                visibility: visible;
            }
        }

        .lb-content-element__header {
            .lb-content-element__header-buttons {
                visibility: visible;
            }
        }
    }

    .lb-content-element__header {
        display: flex;
        justify-content: space-between;
        gap: 10px;

        .lb-content-element__title {
            .lb-editable-text__text, .lb-editable-text__input {
                font-size: 1.6rem;
                font-weight: 500;
            }
        }

        .lb-content-element__header-buttons {
            visibility: hidden;
        }
    }

    .lb-content-element__body {
        display: flex;
    }

    .lb-content-element__footer {
        display: flex;
        justify-content: flex-end;

        .lb-content-element__footer-buttons {
            display: flex;
            gap: 0.5em;
            visibility: hidden;
        }
    }
}

</style>