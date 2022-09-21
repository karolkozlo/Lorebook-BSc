<template>
  <div class="lb-editable-text">
    <div class="lb-editable-text__content" :style="setWidth" :class="customClass">
        <div class="lb-editable-text__cancel-button" v-if="active">
            <icon icon="lb-cancel-circled" :size="1.22" @click="deactivate"></icon>
        </div>
            <pre v-if="!active" class="lb-editable-text__text" :class="textClass" v-on:dblclick="activate">{{ value ? value : noContent }}</pre>
            <input v-show="active && type == 'input'"
                   class="lb-editable-text__input"
                   type="text"
                   v-model="editedValue"
                   :maxlength="maxLength"
                   ref="input">
            <textarea v-show="active && type == 'textarea'"
                      class="lb-editable-text__input"
                      v-model="editedValue"
                      :maxlength="maxLength"
                      ref="textarea"
                      :style="`min-height: ${minHeight}px;`"/>
        <div class="lb-editable-text__save-button" v-if="active">
            <icon icon="lb-ok-circle-fill" :size="1.22" @click="save"></icon>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'LbEditableText',
    props: {
        value: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'input',
            validator(value) {
                return ["input", "textarea"].includes(value);
            }
        },
        width: {
            type: String,
        },
        customClass: {
            type: String,
        },
        maxLength: {
            type: Number
        },
        minHeight: {
            type: Number,
            default: 150
        },
        noContent: {
            type: String,
            default: 'No text'
        }
    },
    emits: ['onSave'],
    data() {
        return {
            active: false,
            editedValue: this.value
        };
    },
    computed: {
        textClass() {
            if(!this.value) {
                return 'lb-editable-text__text--no-content';
            }
            return '';
        },
        setWidth() {
            return this.width ? `width: ${this.width};` : '';
        }
    },
    methods: {
        activate() {
            this.active = true;
            if (this.type === 'input') {
                this.$nextTick(() => {
                    this.$refs.input.focus();
                });
            } else if (this.type === 'textarea') {
                this.$nextTick(() => {
                    this.$refs.textarea.focus();
                });
            }
        },
        deactivate() {
            this.active = false;
            this.editedValue = this.value;
        },
        save() {
            this.$emit('onSave', this.editedValue);
            this.active = false;
        }
    },
    watch: {
        value() {
            this.editedValue = this.value;
        }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-editable-text {
    display: flex;
    flex: 1;

    .lb-editable-text__content {
        display: flex;
        align-items: flex-start;
        position: relative;
        gap: 5px;

        .lb-editable-text__text {
            flex: 1;
            font-size: 1.22rem;
            margin: 0;
            font-family: 'Roboto';
            white-space: pre-wrap;
            white-space: -moz-pre-wrap;
            white-space: -o-pre-wrap;

            &--no-content {
                font-style: italic;
            }

            &:hover {
                box-shadow: inset 0px 0px 10px 12px fade(@canvas-white-color, 15);
                border-radius: 10px;
            }
        }

        .lb-editable-text__input {
            width: 100%;
            flex: 1;
            font-size: 1.22rem;
            padding: 0;
            border: none;
            background-color: fade(@canvas-white-color, 30);
            resize: vertical;
            font-family: inherit;
            color: inherit;

            &:focus {
                outline: none;
                box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.3);
                background-color: fade(@canvas-white-color, 50);
            }
        }

        .lb-editable-text__save-button {
            color: @positive-color;

            &:hover {
                color: @positive-secondary-color;
            }
        }

        .lb-editable-text__cancel-button {
            color: @negative-color;

            &:hover {
                color: @negative-secondary-color;
            }
        }
    }
}

</style>