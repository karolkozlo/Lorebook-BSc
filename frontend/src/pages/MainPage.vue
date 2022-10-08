<template>
    <div class="main-page">
        <h1>Test Main Page</h1>
        <nav class="main-page__nav">
            <router-link to="/chapter"> Chapter </router-link>
        </nav>
        <div class="main-page__content">
            <lb-accordion :title="title"
                          :isTitleEditable="true"
                          :maxLength="10"
                          :subtext="'5 Chapters'"
                          @changeTitle="changeTitle">
                <div class="accordion-content">
                    Hello, it's content
                </div>
            </lb-accordion>
        </div>
    </div>
</template>

<script>
import LbAccordion from '../components/LbAccordion.vue';

export default {
    name: "MainPage",
    components: {
      LbAccordion
    },
    data() {
        return {
            title: 'Story Name'
        };
    },
    methods: {
        changeTitle(newTitle) {
            this.title = newTitle;
        }
    }
};
</script>

<style lang="less">

.main-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 0em;

    .main-page__nav {
        display: flex;
        flex-direction: column;
    }

    .main-page__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70%;
        gap: 0.5em;
    }
}
</style>