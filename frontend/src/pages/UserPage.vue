<template>
    <div class="user-page">
        <h1>Test User Page</h1>
        <span>Hello, {{ username }}</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "MainPage",
    computed: {
        ...mapGetters(['username']),
    }
};
</script>

<style lang="less">

.user-page {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>