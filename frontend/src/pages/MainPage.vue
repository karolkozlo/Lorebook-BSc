<template>
    <div class="main-page">
        <h1>Test Main Page</h1>
        <nav class="main-page__nav">
            <router-link to="/chapter"> Chapter </router-link>
        </nav>
        <lb-menu-button icon="lb-plus" :size="1.2" :options="options" @click="clickOnMenuBtn">
        </lb-menu-button>
        <div class="main-page__content">
            <component v-for="(el, index) in contentElements"
                       :is="componentType(el.type)"
                       :key="{id: el.id, type: el.type}"
                       :position="index"
                       :isLast="isLast(index)"
                       :contentID="contentID"
                       v-bind="el"
                       @moveElement="moveElement"
                       @deleteElement="removeElement">
            </component>
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
            contentID: 1,
            contentElements: [
                {
                  id: 1,
                  initTitle: 'Some Title',
                  initText: 'Some starting text to edit in TextElement',
                  type: contentElementType.text
                },
                {
                  id: 2,
                  initTitle: 'Some Other Title',
                  initText: 'Some another starting text to edit in TextElement',
                  type: contentElementType.text
                },
                {
                  id: 1,
                  initTitle: 'Some Initial Title of List',
                  type: contentElementType.list,
                  initItems: [
                    {
                      id: 2,
                      initTitle: 'Another item with longer text',
                      initText: '',
                      ordinalNumber: 0
                    },
                    {
                      id: 3,
                      initTitle: 'item',
                      initText: 'dsf',
                      ordinalNumber: 1
                    },
                  ]
                },
                {
                    id: 1,
                    initTitle: 'Jakaś grupa linków',
                    type: contentElementType.linkGroup,
                    initLinks: [
                        {
                            id: 1,
                            initDescription: 'Some description',
                            targetName: 'Link do Lokacji',
                            targetID: 1,
                            categoryName: 'Locations',
                            categoryID: 'Locations'
                        },
                        {
                            id: 2,
                            initDescription: 'Ooopiss',
                            targetName: 'Link do Stworzenia',
                            targetID: 1,
                            categoryName: 'Stworzenia',
                            categoryID: 1
                        },
                    ]
                }
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
            this.contentElements = this.contentElements.filter(el => { return !(el.id == elToDel.id && el.type == elToDel.type); });
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
                type: contentElementType.text
            });
        },
        isLast(index) {
            return this.contentElements.length-1 == index;
        },
        componentType(type) {
            if (type == contentElementType.text) return 'LbTextElement';
            if (type == contentElementType.list) return 'LbListElement';
            if (type == contentElementType.linkGroup) return 'LbLinkGroupElement';
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