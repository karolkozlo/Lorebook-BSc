<template>
    <div>
        <i :class="icon" :style="`font-size: ${size}rem`"></i>
    </div>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        icon: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            default: 1
        }
    }
}
</script>

<style lang="less">
@import '../icons.less';

</style>
