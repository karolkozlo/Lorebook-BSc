<template>
    <div class="main-page">
        <h1>Test Main Page</h1>
        <nav class="main-page__nav">
            <router-link to="/chapter"> Chapter </router-link>
        </nav>
        <lb-menu-button icon="lb-plus" :size="1.2" :options="options" @click="clickOnMenuBtn">
        </lb-menu-button>
        <div class="main-page__content">
            <lb-text-element v-for="(el, index) in contentElements"
                             :key="el.id"
                             :position="index"
                             :isLast="isLast(index)"
                             :contentID="contentID"
                             v-bind="el"
                             @moveElement="moveElement"
                             @deleteElement="removeElement">
            </lb-text-element>
        </div>
    </div>
</template>

<script>
import LbContentElement from '@/components/contentElements/LbContentElement.vue';
import LbEditableText from '../components/LbEditableText.vue';
import LbMenuButton from '../components/LbMenuButton.vue';
import LbTextElement from '@/components/contentElements/LbTextElement.vue';

export default {
    name: "MainPage",
    components: {
      LbEditableText,
      LbMenuButton,
      LbContentElement,
      LbTextElement
    },
    data() {
        return {
            contentID: 1,
            contentElements: [
                {
                  id: 1,
                  initTitle: 'Some Title',
                  initText: 'Some starting text to edit in TextElement',
                },
                {
                  id: 2,
                  initTitle: 'Some Other Title',
                  initText: 'Some another starting text to edit in TextElement',
                },
            ],
            text: 'Some text to edit',
            options: [
                {
                    id: 1,
                    name: 'Option 1',
                    icon: 'lb-edit'
                },
                {
                    id: 2,
                    name: 'Option 2',
                    icon: 'lb-link'
                },
                {
                    id: 3,
                    name: 'Option 3',
                    icon: 'lb-list'
                },
                {
                    id: 4,
                    name: 'Option 4',
                    icon: 'lb-picture'
                }
            ]
        };
    },
    methods: {
        moveElement(positions) {
            const el = this.contentElements.splice(positions.oldPosition, 1)[0];
            this.contentElements.splice(positions.newPosition, 0, el);
        },
        removeElement(elToDel) {
            this.contentElements = this.contentElements.filter(el => { return el.id !== elToDel.id });
            console.log('Remove element with id: '+elToDel.id+' and type of: '+elToDel.type);
        },
        saveText(newValue) {
            this.text = newValue;
        },
        clickOnMenuBtn(id) {
            const option = this.options.find((o) => { return o.id == id });
            console.log('Clicked option: ', option);
            this.contentElements.push({
                id: 3,
                initTitle: 'New Element',
                initText: 'Some new Element',
            });
        },
        isLast(index) {
            return this.contentElements.length-1 == index;
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

    .main-page__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70%;
        gap: 0.5em;
    }
}
</style>