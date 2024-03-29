<template>
  <lb-content-element :title="title"
                      :isLast="isLast"
                      :position="position"
                      @changeTitle="changeTitle"
                      @moveElement="moveContentElement"
                      @removeElement="deleteElement"
                      :buttonsLoading="buttonsLoading">
    <div class="lb-list-element">
      <div class="lb-list-element__items" v-if="items.length > 0">
        <div class="lb-list-element__item" v-for="(item, index) in sortedItems" :key="item.id">
          <lb-list-item :id="item.id"
                        :title="item.title"
                        :text="item.text"
                        :ordinalNumber="item.ordinalNumber"
                        :isLast="isItemLast(index)"
                        :contentID="contentID"
                        :listID="id"
                        @moveItem="moveItem"
                        @removeListItem="deleteItem">
          </lb-list-item>
          <div class="util__horizontal-line--black"></div>
        </div>
      </div>
      <div class="lb-list-element__no-content" v-if="!items.length">
        No items
      </div>
      <div class="lb-list-element__button">
        <lb-button icon="lb-plus" @click="addListItem" :size="1.2">Add list item</lb-button>
      </div>
    </div>
  </lb-content-element>
</template>

<script>
import LbContentElement from "./LbContentElement.vue";
import LbContentElementMixin from './ContentElement.mixin.js';
import contentElementType from '@/domain/contentElementTypes.js';
import { mapMutations, mapGetters } from 'vuex';
import LbListItem from './LbListItem.vue';
import {
  updateList,
  createListItem,
  deleteListItem,
  updateListItemPosition
} from '@/httpLayers/list.http.js';

export default {
  name: 'LbListElement',
  mixins: [LbContentElementMixin],
  components: {
    LbContentElement,
    LbListItem
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      elementType: contentElementType.list,
    };
  },
  computed: {
    ...mapGetters('element', ['getElementById', 'getListItemByOrder']),
    sortedItems() {
      return this.items.sort((it1, it2) => {
        if (it1.ordinalNumber > it2.ordinalNumber) return 1;
        if (it1.ordinalNumber == it2.ordinalNumber) return 0;
        if (it1.ordinalNumber < it2.ordinalNumber) return -1;
      });
    }
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    isItemLast(index) {
      return this.items.length-1 == index;
    },
    deleteElement() {
      this.$emit('deleteElement', { id: this.id, type: this.elementType });
    },
    async changeTitle(newTitle) {
      try {
        await updateList(this.id, {title: newTitle}, this.contentID);
        const element = this.getElementById(this.id, this.elementType);
        element.title = newTitle;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    },
    async addListItem() {
      let newItem = {
        title: 'Title',
        text: '',
        ordinalNumber: this.items.length ? this.sortedItems[this.items.length-1].ordinalNumber + 1 : 0,
        listID: this.id,
        contentID: this.contentID
      };
      const createdItem = await createListItem(newItem);
      newItem = {
        id: createdItem.id,
        title: newItem.title,
        text: newItem.text,
        ordinalNumber: newItem.ordinalNumber
      };
      const element = this.getElementById(this.id, this.elementType);
      element.items.push(newItem)
    },
    async moveItem(order) {
      const item1 = this.getListItemByOrder(this.id, order.oldOrdinalNumber);
      const item2 = this.getListItemByOrder(this.id, order.newOrdinalNumber);
      await updateListItemPosition(item1.id, {
        listID: this.id,
        oldOrdinalNumber: order.oldOrdinalNumber,
        newOrdinalNumber: order.newOrdinalNumber
      }, this.contentID);
      item1.ordinalNumber = order.newOrdinalNumber;
      item2.ordinalNumber = order.oldOrdinalNumber;
    },
    async deleteItem(id) {
      try {
        await deleteListItem(id, this.contentID);
        const element = this.getElementById(this.id, this.elementType);
        const position = element.items.find(it => (it.id == id)).ordinalNumber;
        element.items = this.items.filter(it => { return it.id !== id });
        element.items.filter(it => (it.ordinalNumber > position))
                  .forEach(it => {it.ordinalNumber = it.ordinalNumber - 1});
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      }
    }
  }
};
</script>

<style lang="less">
@import '../../common.less';

.lb-list-element {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5em;

  .lb-list-element__items {
    display: flex;
    flex-direction: column;

    .lb-list-element__item {
      display: flex;
      flex-direction: column;
      gap: 0.2em;
      padding: 0.3em 0.5em;
    }
  }

  .lb-list-element__no-content {
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-style: italic;
  }

  .lb-list-element__button {
    display: flex;
    justify-content: center;
  }
}

</style>