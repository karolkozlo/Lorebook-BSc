<template>
    <div class="lb-search-bar" :style="`width: ${width};`">
        <input
            class="lb-search-bar__input"
            type="text"
            v-model="value"
            :placeholder="placeholder"
            @keydown="handleEnterPress">
        <button class="lb-search-bar__button" @click="$emit('search', value)">
            <icon icon="lb-search"></icon>
        </button>
    </div>
</template>

<script>
export default {
    name: 'LbSearchBar',
    emits: ['search'],
    props: {
        placeholder: {
            type: String,
            default: "Search..."
        },
        width: {
            type: String,
            default: "100%"
        },
        text: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            value: this.text,
        };
    },
    methods: {
        handleEnterPress(event) {
            if(event.key == 'Enter') {
                event.preventDefault();
                this.$emit('search', this.value);
            }
        }
    },
    watch: {
        text(newText) {
            this.value = newText;
        }
    }
};
</script>

<style lang="less">
@import "../common.less";

.lb-search-bar {
    display: flex;
    flex-wrap: nowrap;

    .lb-search-bar__input {
        background-color: @canvas-white-color;
        border: none;
        border-bottom: 1px solid transparent;
        padding: 0.5em 0.5em 0.2em 0.5em;
        width: 100%;
        font-size: 1.2rem;

        &::placeholder {
            color: @neutral-color;
        }

        &:focus {
            outline: none;
            box-shadow: inset 3px 3px 2px #C4C4C4;
            border-color: @dark-text-color;
        }
    }

    .lb-search-bar__button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: @accent-color;
        color: @light-text-color;
        border: none;
        padding: 0.4em;
        font-size: 1.2rem;

        &:hover {
            background-color: @accent-brighter-color;
        }

        &:active {
            background-color: @accent-darker-color;
            color: @special-color;
        }
    }
}

</style>