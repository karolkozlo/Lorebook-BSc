<template>
  <div class="lb-content-swapper">
    <button class="lb-content-swapper__option"
            v-for="option in options"
            :key="option.key"
            :class="setActiveClass(option.key)"
            :disabled="option.disabled || option.key == activeOption"
            @click="selectOption(option.key)">
        {{ option.name }}
    </button>
  </div>
</template>

<script>
export default {
    name: 'LbContentSwapper',
    props: {
        /**
         * It Should be array of { name: String, key: String, disabled: Boolean }
         * key can be component name or route
         */
        options: {
            type: Array,
            required: true
        },
        activeOption: {
            type: String,
            default: null
        },
    },
    emits: ['onSelect'],
    methods: {
        selectOption(key) {
            this.$emit('onSelect', key);
        },
        setActiveClass(key) {
            if (this.activeOption == key) {
                return 'lb-content-swapper__option--active';
            }
            return '';
        }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-content-swapper {
    display: flex;
    gap: 2px;

    .lb-content-swapper__option {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        font-weight: 600;
        padding: 0.3em 0em;
        flex-basis: 100%;
        border: none;
        background-color: @accent-color;
        color: @light-text-color;

        &:hover {
            background-color: @accent-brighter-color;
        }

        &:active, &--active, &--active:hover {
            background-color: @accent-darker-color;
            color: @green-light-color;
        }

        &:first-child {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        &:last-child {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
}

</style>