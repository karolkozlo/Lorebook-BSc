<template>
  <lb-content-element :title="title"
                      :isLast="isLast"
                      :position="position"
                      @changeTitle="changeTitle"
                      @moveElement="moveContentElement"
                      @removeElement="deleteElement"
                      :buttonsLoading="buttonsLoading">
    <div class="lb-link-group-element">
      <div class="lb-link-group-element__items" v-if="links.length > 0">
        <div class="lb-link-group-element__item" v-for="link in links" :key="link.id">
          <lb-content-link
                   :id="link.id"
                   :contentID="contentID"
                   :description="link.description"
                   :targetID="link.targetID"
                   :targetName="link.targetName"
                   :categoryID="link.categoryID"
                   :categoryName="link.categoryName"
                   :linkGroupID="id"
                   @removeLink="deleteContentLink"></lb-content-link>
          <div class="util__horizontal-line--black"></div>
        </div>
      </div>
      <div class="lb-link-group-element__no-content" v-if="!links.length">
        No links
      </div>
      <div class="lb-link-group-element__button">
        <lb-button icon="lb-link" @click="openLinkPopup" :size="1.2">Add new link</lb-button>
      </div>
    </div>
    <link-popup v-if="isLinkPopupOpen"
                :linkGroupID="id"
                :elementID="elementID"
                :elementCategoryID="categoryID"
                @onResult="addNewLink"></link-popup>
  </lb-content-element>
</template>

<script>
import LbContentElement from "./LbContentElement.vue";
import LbContentElementMixin from './ContentElement.mixin.js';
import contentElementType from '@/domain/contentElementTypes.js';
import { mapMutations, mapGetters } from 'vuex';
import LbContentLink from './LbContentLink.vue';
import {
  updateLinkGroup,
  deleteLink
} from '@/httpLayers/link.http.js';
import LinkPopup from '@/popups/LinkPopup.vue';

export default {
  name: 'LbLinkGroupElement',
  mixins: [ LbContentElementMixin ],
  components: {
    LbContentElement,
    LbContentLink,
    LinkPopup,
  },
  props: {
    links: {
      type: Array,
      default: []
    },
    elementID: {
      type: Number,
    },
    categoryID: {
      type: String
    }
  },
  data() {
    return {
      elementType: contentElementType.linkGroup,
    };
  },
  computed: {
    ...mapGetters('element', ['getElementById']),
    ...mapGetters('popups', ['isLinkPopupOpen']),
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    ...mapMutations('popups', ['openLinkPopup']),
    deleteElement() {
      this.$emit('deleteElement', { id: this.id, type: this.elementType });
    },
    async changeTitle(newTitle) {
      try {
        await updateLinkGroup(this.id, {title: newTitle}, this.contentID);
        const element = this.getElementById(this.id, this.elementType);
        element.title = newTitle;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    addNewLink(newLink) {
      const element = this.getElementById(this.id, this.elementType);
      element.links.push(newLink);
    },
    async deleteContentLink(id) {
      try {
        await deleteLink(id, this.contentID);
        const element = this.getElementById(this.id, this.elementType);
        element.links = element.links.filter(link => (link.id != id));
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    }
  }

};
</script>

<style lang="less">
@import '../../common.less';

.lb-link-group-element {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5em;

  .lb-link-group-element__items {
    display: flex;
    flex-direction: column;

    .lb-link-group-element__item {
      display: flex;
      flex-direction: column;
      gap: 0.2em;
      padding: 0.3em 0.5em;
    }
  }

  .lb-link-group-element__no-content {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-style: italic;
  }

  .lb-link-group-element__button {
    display: flex;
    justify-content: center;
  }
}

</style>