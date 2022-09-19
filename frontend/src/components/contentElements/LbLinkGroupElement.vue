<template>
  <lb-content-element :title="title"
                      :isLast="isLast"
                      :position="position"
                      @changeTitle="changeTitle"
                      @moveElement="moveContentElement"
                      @removeElement="deleteElement">
    <div class="lb-link-group-element">
      <div class="lb-link-group-element__items" v-if="links.length > 0">
        <div class="lb-link-group-element__item" v-for="link in links" :key="link.id">
          <lb-content-link
                   :id="link.id"
                   :contentID="contentID"
                   :initDescription="link.initDescription"
                   :targetID="link.targetID"
                   :targetName="link.targetName"
                   :categoryID="link.categoryID"
                   :categoryName="link.categoryName"
                   @removeLink="deleteLink"></lb-content-link>
          <div class="util__horizontal-line--black"></div>
        </div>
      </div>
      <div class="lb-link-group-element__no-content" v-if="!links.length">
        No links
      </div>
      <div class="lb-link-group-element__button">
        <lb-button icon="lb-plus" @click="addNewLink" :size="1.2">Add new link</lb-button>
      </div>
    </div>
  </lb-content-element>
</template>

<script>
import LbContentElement from "./LbContentElement.vue";
import LbContentElementMixin from './ContentElement.mixin.js';
import contentElementType from '@/domain/contentElementTypes.js';
import { mapMutations } from 'vuex';
import LbContentLink from './LbContentLink.vue';
import {
  updateLinkGroup,
  deleteContentLink
} from '@/httpLayers/link.http.js';

export default {
  name: 'LbLinkGroupElement',
  mixins: [ LbContentElementMixin ],
  components: {
    LbContentElement,
    LbContentLink
  },
  props: {
    initLinks: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      elementType: contentElementType.linkGroup,
      title: this.initTitle,
      links: this.initLinks
    };
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    deleteElement() {
      this.$emit('deleteElement', { id: this.id, type: this.elementType });
    },
    async changeTitle(newTitle) {
      try {
        await updateLinkGroup(this.id, {title: newTitle}, this.contentID);
        this.title = newTitle;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async addNewLink() {
      // TODO: Integrate with popup for creating links
      console.log(`Create new link for linkGroup with id: ${this.id}`);
    },
    async deleteLink(id) {
      try {
        await deleteContentLink(id, this.contentID);
        this.links = this.links.filter(link => (link.id != id));
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