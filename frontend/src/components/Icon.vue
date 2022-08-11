<template>
    <div>
        <i :class="icon" :style="setSize"></i>
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
        }
    },
    computed: {
        setSize() {
            if(this.size) {
                return `font-size: ${this.size}rem`;
            }
        }
    }
}
</script>

<style lang="less">
@import '../icons.less';

</style>
