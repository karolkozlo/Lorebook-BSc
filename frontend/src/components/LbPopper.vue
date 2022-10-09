<template>
    <focus-trap :active="isOpen">
        <div class="lb-popper" v-if="this.isOpen" :tabindex="-1">
            <div class="lb-popper__content">
                <slot></slot>
            </div>
        </div>
    </focus-trap>
</template>

<script>
import {FocusTrap} from 'focus-trap-vue';

export default{
    name: "LbPopper",
    components: {
        FocusTrap
    },
    props: {
        isOpen:{
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="less">

.lb-popper{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);

    .lb-popper__content{
        top:50%;
        left:50%;
        position:fixed;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        align-content: center;
        z-index: 9999;
    }
}

</style>
