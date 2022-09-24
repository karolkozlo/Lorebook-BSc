<template>
  <div class="lb-content">
    <div class="lb-content__menu">
      <lb-menu-button icon="lb-plus"
                      :size="1.2"
                      :options="options"
                      :loading="createLoading"
                      @click="clickOnMenuBtn"
                      class="lb-content__button-btn">
      </lb-menu-button>
    </div>
    <div class="lb-content__elements" v-if="contentElements.length">
      <component v-for="(el, index) in contentElements"
               :is="componentType(el.type)"
               :key="{id: el.id, type: el.type}"
               :position="index"
               :isLast="isLast(index)"
               :contentID="contentID"
               :buttonsLoading="elementButtonsLoading"
               :elementID="elementID"
               :categoryID="categoryID"
               v-bind="el"
               @moveElement="moveElement"
               @deleteElement="removeElement">
      </component>
    </div>
    <div class="lb-content__empty" v-if="contentElements.length == 0">
      No content elements yet
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import LbMenuButton from '@/components/LbMenuButton.vue';
import LbTextElement from '@/components/contentElements/LbTextElement.vue';
import LbListElement from '@/components/contentElements/LbListElement.vue';
import LbLinkGroupElement from '@/components/contentElements/LbLinkGroupElement.vue';
import LbImageGroupElement from '@/components/contentElements/LbImageGroupElement.vue';
import contentElementType from '@/domain/contentElementTypes.js';
import { updateContentConfig } from '@/httpLayers/content.http.js';
import { createContentElement, deleteContentElement } from '@/httpLayers/contentElement.interface.js';

export default {
  name: 'LbContent',
  components: {
    LbMenuButton,
    LbTextElement,
    LbListElement,
    LbLinkGroupElement,
    LbImageGroupElement
  },
  props: {
    elementID: Number,
    categoryID: String
  },
  data() {
    return {
      options: [
        {
          id: 1,
          name: 'Text',
          type: contentElementType.text,
          icon: 'lb-edit'
        },
        {
          id: 2,
          name: 'List',
          type: contentElementType.list,
          icon: 'lb-list'
        },
        {
          id: 3,
          name: 'Link Group',
          type: contentElementType.linkGroup,
          icon: 'lb-link'
        },
        {
          id: 4,
          name: 'Image Group',
          type: contentElementType.imageGroup,
          icon: 'lb-picture'
        },
      ],
      createLoading: false,
      elementButtonsLoading: false,
    };
  },
  computed: {
    ...mapGetters('element', ['config', 'contentID', 'contentElements']),
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    ...mapMutations('element', ['removeContentElement']),
    async moveElement(positions) {
      this.elementButtonsLoading = true;
      const el = this.contentElements.splice(positions.oldPosition, 1)[0];
      this.contentElements.splice(positions.newPosition, 0, el);
      try {
        await updateContentConfig(this.contentID, this.config);
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      } finally {
        this.elementButtonsLoading = false;
      }
    },
    async removeElement(elToDel) {
      try {
        this.elementButtonsLoading = true;
        await deleteContentElement(elToDel.id, this.contentID, elToDel.type);
        this.removeContentElement(elToDel);
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      } finally {
         this.elementButtonsLoading = false;
      }
    },
    async clickOnMenuBtn(id) {
      const type = this.options.find((o) => { return o.id == id }).type;
      try {
        this.createLoading = true;
        let element = { title: `Title of ${type}` };
        if (type == contentElementType.text) {
          element.text = '';
        }
        const createdElement = await createContentElement(element, this.contentID, type);
        element.id = createdElement.id;
        element.type = type;
        if (type == contentElementType.list) {
          element.items = [];
        }
        if (type == contentElementType.linkGroup) {
          element.links = [];
        }
        this.contentElements.push(element);
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      } finally {
        this.createLoading = false;
      }
    },
    componentType(type) {
      if (type == contentElementType.text) return 'LbTextElement';
      if (type == contentElementType.list) return 'LbListElement';
      if (type == contentElementType.linkGroup) return 'LbLinkGroupElement';
      if (type == contentElementType.imageGroup) return 'LbImageGroupElement';
    },
    isLast(index) {
      return this.contentElements.length-1 == index;
    },
  }
};
</script>

<style lang="less">
@import '../../common.less';

.lb-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding-bottom: 150px;

  .lb-content__menu {
    display: flex;
    width: 100%;

    .lb-content__button-btn {
      position: fixed;
    }
  }

  .lb-content__elements {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    width: 80%;
  }
}

</style>