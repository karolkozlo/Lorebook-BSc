<template>
    <div class="main-page">
        <h1>Test Main Page</h1>
        <nav class="main-page__nav">
            <router-link to="/chapter"> Chapter </router-link>
        </nav>
        <div class="main-page__content">
        </div>
    </div>
</template>

<script>
import LbContentElement from '@/components/contentElements/LbContentElement.vue';
import LbEditableText from '../components/LbEditableText.vue';
import LbMenuButton from '../components/LbMenuButton.vue';
import LbTextElement from '@/components/contentElements/LbTextElement.vue';
import LbListElement from '../components/contentElements/LbListElement.vue';
import LbLinkGroupElement from '../components/contentElements/LbLinkGroupElement';
import contentElementType from '@/domain/contentElementTypes.js';

export default {
    name: "MainPage",
    components: {
      LbEditableText,
      LbMenuButton,
      LbContentElement,
      LbTextElement,
      LbListElement,
      LbLinkGroupElement
    },
    data() {
        return {
            text: 'Some text to edit',
        };
    },
    methods: {
        saveText(newValue) {
            this.text = newValue;
        },
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