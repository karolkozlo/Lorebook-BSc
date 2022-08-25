<template>
    <div class="main-page">
        <h1>Test Main Page</h1>
        <lb-editable-text :value="text" width="800px" type="textarea" @onSave="saveText"></lb-editable-text>
        <nav class="main-page__nav">
            <router-link to="/chapter"> Chapter </router-link>
        </nav>
    </div>
</template>

<script>
import LbEditableText from '../components/LbEditableText.vue';
export default {
    name: "MainPage",
    components: {
      LbEditableText
    },
    data() {
        return {
            text: 'Some text to edit'
        };
    },
    methods: {
        saveText(newValue) {
            this.text = newValue;
        }
    }
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