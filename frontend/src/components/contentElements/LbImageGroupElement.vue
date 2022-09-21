<template>
  <lb-content-element :title="title"
                      :isLast="isLast"
                      :position="position"
                      @changeTitle="changeTitle"
                      @moveElement="moveContentElement"
                      @removeElement="deleteElement"
                      :buttonsLoading="buttonsLoading">
    Image Group
  </lb-content-element>
</template>

<script>
import LbContentElement from "./LbContentElement.vue";
import LbContentElementMixin from './ContentElement.mixin.js';
import contentElementType from '@/domain/contentElementTypes.js';

export default {
  name: 'LbImageGroupElement',
  mixins: [LbContentElementMixin],
  components: {
    LbContentElement,
  },
  data() {
    return {
      elementType: contentElementType.imageGroup,
    };
  },
  methods: {
    deleteElement() {
      this.$emit('deleteElement', { id: this.id, type: this.elementType });
    },
    async changeTitle(newTitle) {
      try {
        //await updateImageGroup(this.id, {title: newTitle}, this.contentID);
        //this.title = newTitle;
      } catch (error) {
        // this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
  }
}
</script>

<style lang="less">
</style>