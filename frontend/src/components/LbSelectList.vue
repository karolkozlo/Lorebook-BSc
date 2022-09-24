<template>
  <div class="lb-select-list">
    <div class="lb-select-list__header">
      <h2 class="lb-select-list__header-text" :style="`font-size: ${size + 0.3}rem`">{{ headText }}</h2>
      <div class="util__horizontal-line--white"></div>
    </div>
    <div class="lb-select-list__items" v-if="items.length" :style="loadingVisibility">
      <div class="lb-select-list__item" v-for="(item, index) in items" :key="index"
                                        :class="itemChecked(item.id).listItem"
                                        @click="selectItem(item.id)">
        <div class="lb-select-list__item-content" :style="`font-size: ${size}rem`">
          <span class="lb-select-list__item-name">{{ item.name }}</span>
          <icon icon="lb-ok" class="lb-select-list__check-icon" :size="size"></icon>
        </div>
        <div :class="itemChecked(item.id).line"></div>
      </div>
    </div>
    <div class="lb-select-list__no-items" v-if="items.length == 0">
      {{ noItemsText }}
    </div>
    <lb-spinner v-if="loading"></lb-spinner>
  </div>
</template>

<script>

export default {
  name: 'LbSelectList',
  emits: ['go', 'onSelect'],
  props: {
    headText: {
      type: String,
      default: 'Name'
    },
    selectedID: {
      type: Number,
      default: null
    },
    items: {
      type: Array,
      default: []
    },
    noItemsText: {
      type: String,
      default: 'No Elements'
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 1
    }
  },
  computed: {
    loadingVisibility() {
      return this.loading ? 'visibility: hidden;' : 'visibility: visible;';
    }
  },
  methods: {
    itemChecked(id) {
      if (this.selectedID == id) return {
        listItem: 'lb-select-list__item--checked',
        line: 'util__horizontal-line--green'
      };
      return {
        listItem: '',
        line: 'util__horizontal-line--white'
      };
    },
    selectItem(id) {
      if (!this.loading) {
        this.$emit('onSelect', id);
      }
    }
  }

}
</script>

<style lang="less">
@import "../common.less";

.lb-select-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: @secondary-color;
  border-radius: 10px;
  color: @light-text-color;
  width: 100%;
  padding: 0.5em;
  position: relative;

  .lb-select-list__header {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;

    .lb-select-list__header-text {
      margin: 0;
      // font-size: 1.3rem;
      font-weight: 500;
      margin-bottom: 5px;
    }
  }

  .lb-select-list__items {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    .lb-select-list__item {
      display: flex;
      flex-direction: column;

      &:hover {
        .lb-select-list__item-content {
          .lb-select-list__check-icon {
            visibility: visible;
          }
        }
      }

      .lb-select-list__item-content {
        display: flex;
        justify-content: space-between;

        .lb-select-list__check-icon {
          visibility: hidden;
        }
      }

      &--checked {
        color: @green-light-color;
        .lb-select-list__item-content {
          color: @green-light-color;

          .lb-select-list__check-icon {
            visibility: visible;
          }
        }
      }
    }
  }

  .lb-select-list__no-items {
    font-style: italic;
    font-weight: 400;
  }
}

</style>