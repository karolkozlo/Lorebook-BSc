<template>
    <div class="lb-popper" v-if="this.isOpen">
        <div class="lb-popper__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default{
    name: "LbPopper",
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
    }
}

</style>
