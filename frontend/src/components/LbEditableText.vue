<template>
  <div class="lb-editable-text">
    <div class="lb-editable-text__content" :style="`width: ${width};`" :class="customClass">
        <div class="lb-editable-text__cancel-button" v-if="active">
            <icon icon="lb-cancel-circled" :size="1.22" @click="deactivate"></icon>
        </div>
            <pre v-if="!active" class="lb-editable-text__text" @click="activate">{{ value }}</pre>
            <input v-if="active && type == 'input'"
                   class="lb-editable-text__input"
                   type="text"
                   v-model="editedValue"
                   :maxlength="maxLength">
            <textarea v-if="active && type == 'textarea'"
                      class="lb-editable-text__textarea"
                      v-model="editedValue"
                      :maxlength="maxLength"
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
            default: ''
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
        }
    },
    emits: ['onSave'],
    data() {
        return {
            active: false,
            editedValue: this.value
        };
    },
    methods: {
        activate() {
            this.active = true;
        },
        deactivate() {
            this.active = false;
        },
        save() {
            this.$emit('onSave', this.editedValue);
        }
    },
    watch: {
        value() {
            this.editedValue = this.value;
            this.active = false;
        }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-editable-text {
    display: flex;

    .lb-editable-text__content {
        display: flex;
        align-items: flex-start;
        position: relative;

        .lb-editable-text__text {
            flex: 1;
            font-size: 1.22rem;
            margin: 0;
            font-family: 'Roboto';
        }

        .lb-editable-text__input, .lb-editable-text__textarea {
            width: 100%;
            flex: 1;
            font-size: 1.22rem;
            padding: 0;
            border: none;
            background-color: fade(@canvas-white-color, 30);
            resize: vertical;
            font-family: 'Roboto';

            &:focus {
                outline: none;
                box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.3);
                background-color: fade(@canvas-white-color, 50);
            }
        }

        .lb-editable-text__save-button {
            position: absolute;
            left: calc(100% + 5px);
            color: @positive-color;

            &:hover {
                color: @positive-secondary-color;
            }
        }

        .lb-editable-text__cancel-button {
            position: absolute;
            right: calc(100% + 5px);
            color: @negative-color;

            &:hover {
                color: @negative-secondary-color;
            }
        }
    }
}

</style>