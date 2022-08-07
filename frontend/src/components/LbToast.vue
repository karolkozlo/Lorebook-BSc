<template>
    <transition name="toast">
        <div class="lb-toast" :class="setTypeClass" v-if="isOpen">
            <icon class="lb-toast__close-button" icon="lb-cancel-circled" :size="1.2" @click="$emit('close')"/>
            <span class="lb-toast__message">{{ message }}</span>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'LbToast',
    emits: ['close'],
    props: {
        message: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            validator(value) {
                if (value === "positive" || value === "negative" || value === '') {
                    return true;
                }
                return false;
            }
        },
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        setTypeClass() {
            return `lb-toast--${this.type}`;
        }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-toast {
    display: flex;
    align-items: center;
    position: absolute;
    color: @light-text-color;
    border-radius: 15px;
    padding: 0.4em;
    z-index: 9999;
    gap: 10px;
    font-size: 1.2rem;
    left: 50%;
    transform: translateX(-50%);

    &--negative {
        background-color: @negative-color;
    }

    &--positive {
        background-color: @positive-color;
    }

    .lb-toast__close-button {
        &:hover {
            color: @neutral-color;
        }
    }
}

.toast-enter-from, .toast-leave-to {
    opacity: 0;
    transform: translateY(-30px) translateX(-50%);
}

.toast-enter-active, .toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-to, .toast-leave-from {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
}


</style>