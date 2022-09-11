<template>
  <lb-content-element :title="title"
                      :isLast="isLast"
                      :position="position"
                      @changeTitle="changeTitle"
                      @moveElement="moveContentElement"
                      @removeElement="deleteElement">
    <div class="lb-text-element">
      <lb-editable-text :value="text" type="textarea" width="100%" @onSave="saveText"></lb-editable-text>
    </div>
  </lb-content-element>
</template>

<script>
import LbContentElement from "./LbContentElement.vue";
import LbEditableText from "@/components/LbEditableText.vue";
import LbContentElementMixin from './ContentElement.mixin.js';
import contentElementType from '@/domain/contentElementTypes.js';
import { updateText } from '@/httpLayers/text.http.js';
import { mapMutations } from 'vuex';

export default {
  name: 'LbTextElement',
  mixins: [LbContentElementMixin],
  components: {
    LbContentElement,
    LbEditableText
  },
  props: {
    initText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      elementType: contentElementType.text,
      title: this.initTitle,
      text: this.initText
    };
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    deleteElement() {
      this.$emit('deleteElement', { id: this.id, type: this.elementType });
    },
    async changeTitle(newTitle) {
      try {
        await updateText(this.id, { title: newTitle }, this.contentID);
        this.title = newTitle;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async saveText(newText) {
      try {
        await updateText(this.id, { text: newText }, this.contentID);
        this.text = newText;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    }
  }
};
</script>

<style lang="less">

.lb-text-element {
  display: flex;
  flex: 1;
}

</style>