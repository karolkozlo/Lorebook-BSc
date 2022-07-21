<template>
    <div class="lb-spinner" :class="setVariant">
        <div class="lb-spinner__loader" :style="setStyle"></div>
    </div>
</template>

<script>
export default {
    name: 'LbSpinner',
    props: {
        size: {
            type: String,
            default: '35px'
        },
        thickness: {
            type: String,
            default: '5px'
        },
        variant: {
            type: String,
            default: ''
        }
    },
    computed: {
        setStyle() {
            return `width: ${this.size}; height: ${this.size}; border-width: ${this.thickness};`
        },
        setVariant() {
            return this.variant.length > 0 ? `lb-spinner--${this.variant}` : '';
        }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-spinner {
    display: flex;
    margin: 0;
    align-content: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: auto;
    transform: translate(-50%,-50%);

    &--dark {
        .lb-spinner__loader {
            border-color: @dark-text-color;
            border-bottom-color: transparent;
        }
    }
}

.lb-spinner__loader {
    display: inline-block;
    box-sizing: border-box;
    border: solid @light-text-color;
    border-width: 5px;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>