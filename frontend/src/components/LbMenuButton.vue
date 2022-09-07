<template>
  <div class="lb-menu-button">
    <div class="lb-menu-button__activator">
        <lb-button :size="size" :icon="icon" :disabled="disabled" :loading="loading" @click="clickActivator">
            <slot/>
        </lb-button>
    </div>
    <div class="lb-menu-button__dropdown" v-if="!disabled && !loading && isOpen">
        <div class="lb-menu-button__options">
            <div class="lb-menu-button__option" v-for="option in options" :key="option.id" @click="clickOption(option.id)" :style="optionSize">
                <icon v-if="option.icon" :icon="option.icon" class="lb-menu-button__option-icon"></icon>
                <span>{{ option.name }}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LbMenuButton',
    emits: ['click'],
    props: {
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
        },
        loading: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: [],
            required: true,
        }
    },
    data() {
        return {
            isOpen: false
        };
    },
    computed: {
        optionSize() {
            return `font-size: ${this.size}rem;`;
        }
    },
    methods: {
        clickActivator() {
            this.isOpen = !this.isOpen;
        },
        clickOption(id) {
            this.$emit('click', id);
            this.isOpen = false;
        }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-menu-button {
    display: flex;
    flex-direction: column;
    position: relative;

    .lb-menu-button__dropdown {
        display: flex;
        flex-direction: column;
        z-index: 9999;

        .lb-menu-button__options {
            display: flex;
            flex-direction: column;
            position: absolute;
            box-shadow: 2px 2px 2px #727272;

            .lb-menu-button__option {
                display: flex;
                align-items: center;
                min-width: max-content;
                padding: 0.5em;
                color: @light-text-color;
                background-color: @secondary-color;
                cursor: pointer;
                border-bottom: 1px solid @light-text-color;

                &:last-child {
                    border-bottom: none;
                }

                &:hover {
                    background-color: @accent-color;
                }

                .lb-menu-button__option-icon {
                    margin-right: 0.2em;
                }
            }
        }
    }
}

</style>