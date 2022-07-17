<template>
    <div class="main-page">
        <h1>Test Main Page</h1>
        <nav class="main-page__nav">
            <router-link to="/chapter"> Chapter </router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: "MainPage",
};
</script>

<style lang="less">

.main-page {
    display: flex;
    flex-direction: column;
    align-items: center;

    .main-page__nav {
        display: flex;
        flex-direction: column;
    }
}
</style>