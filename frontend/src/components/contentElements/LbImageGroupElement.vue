<template>
  <lb-content-element :title="title"
                      :isLast="isLast"
                      :position="position"
                      @changeTitle="changeTitle"
                      @moveElement="moveContentElement"
                      @removeElement="deleteElement"
                      :buttonsLoading="buttonsLoading">
    <div class="lb-image-group-element">
      This functionality is implemented yet.
    </div>
  </lb-content-element>
</template>

<script>
import LbContentElement from "./LbContentElement.vue";
import LbContentElementMixin from './ContentElement.mixin.js';
import contentElementType from '@/domain/contentElementTypes.js';
import { updateImageGroup } from '@/httpLayers/image.http.js';
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters('element', ['getElementById']),
  },
  methods: {
    deleteElement() {
      this.$emit('deleteElement', { id: this.id, type: this.elementType });
    },
    async changeTitle(newTitle) {
      try {
        await updateImageGroup(this.id, {title: newTitle}, this.contentID);
        const element = this.getElementById(this.id, this.elementType);
        element.title = newTitle;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
  }
}
</script>

<style lang="less">
@import '../../common.less';

.lb-image-group-element {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  font-size: 1.2rem;
  font-weight: 500;
}
</style>