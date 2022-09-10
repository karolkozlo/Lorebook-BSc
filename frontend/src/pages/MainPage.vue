<template>
    <div class="main-page">
        <h1>Test Main Page</h1>
        <nav class="main-page__nav">
            <router-link to="/chapter"> Chapter </router-link>
        </nav>
        <lb-menu-button icon="lb-plus" :size="1.2" :options="options" @click="clickOnMenuBtn">
        </lb-menu-button>
        <div class="main-page__content">
            <lb-content-element :position="position"
                                :isLast="true"
                                :title="title"
                                @moveElement="moveElement"
                                @removeElement="removeElement"
                                @changeTitle="changeTitle">
                <lb-editable-text :value="text" width="800px" type="textarea" @onSave="saveText"></lb-editable-text>
            </lb-content-element>
        </div>
    </div>
</template>

<script>
import LbContentElement from '../components/LbContentElement.vue';
import LbEditableText from '../components/LbEditableText.vue';
import LbMenuButton from '../components/LbMenuButton.vue';

export default {
    name: "MainPage",
    components: {
      LbEditableText,
      LbMenuButton,
      LbContentElement
    },
    data() {
        return {
            title: 'Title',
            text: 'Some text to edit',
            position: 0,
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
        moveElement(newPosition) {
            this.position = newPosition;
            console.log(newPosition);
        },
        removeElement() {
            console.log('Remove element');
        },
        changeTitle(newTitle) {
            this.title = newTitle;
        },
        saveText(newValue) {
            this.text = newValue;
        },
        clickOnMenuBtn(id) {
            const option = this.options.find((o) => { return o.id == id });
            console.log('Clicked option: ', option);
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