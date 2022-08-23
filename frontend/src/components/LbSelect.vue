<template>
  <div class="lb-select" :style="setWidth">
    <div class="lb-select__control" @click="toggleOpen">
      <div class="lb-select__text-field">
        {{ setSelectText }}
      </div>
      <div class="lb-select__button">
        <icon :icon="setIcon"></icon>
      </div>
    </div>
    <div class="lb-select__dropdown" v-show="isOpen">
        <div class="lb-select__dropdown-content" v-if="itemsToSelect.length > 0">
            <div class="lb-select__item" v-for="(item, index) in itemsToSelect" :key="index" @click="selectItem(index)">
                <span class="lb-select__item-text">
                    {{ item.name }}
                </span>
                <div class="lb-select__item-icon" :style="item.selected ? 'visibility: visible;': 'visibility: hidden;'">
                    <icon icon="lb-ok"></icon>
                </div>
            </div>
        </div>
        <div v-else class="lb-select__no-content">
            No items
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LbSelect",
  props: {
    items: {
        type: Array,
        default: []
    },
    multiselect: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: ""
    },
    width: {
        type: String,
        default: "150px"
    }
  },
  emits: ["handleSelection"],
  data() {
    return {
        isOpen: false,
        itemsToSelect: this.items,
        selectedItems: []
    };
  },
  computed: {
    setIcon() {
        return this.isOpen ? 'lb-up' : 'lb-down';
    },
    setSelectText() {
        if (this.selectedItems.length === 0) {
            return this.placeholder;
        } else {
            if (this.selectedItems.length == 1) {
                return this.selectedItems[0].name;
            } else {
                return `${this.selectedItems.length} selected options`;
            }
        }
    },
    setWidth() {
        return `width: ${this.width};`;
    }
  },
  methods: {
    toggleOpen() {
        this.isOpen = !this.isOpen;
    },
    selectItem(index) {
        if(this.multiselect) {
            this.itemsToSelect[index].selected = !this.itemsToSelect[index].selected;
            this.selectedItems = this.itemsToSelect.filter(item => {
                return item.selected;
            });
            this.$emit("handleSelection", this.selectedItems);
        } else {
            this.itemsToSelect[index].selected = !this.itemsToSelect[index].selected;
            for (let i=0; i<this.itemsToSelect.length; i++) {
                if(i != index) {
                    this.itemsToSelect[i].selected = false;
                }
            }
            this.selectedItems = this.itemsToSelect[index].selected ? [this.itemsToSelect[index]] : [];
            this.$emit("handleSelection", this.selectedItems);
            this.isOpen = false;
        }
    }
  }
};
</script>

<style lang="less">
@import "../common.less";

.lb-select {
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: 'Roboto';

  .lb-select__control {
    display: flex;

    .lb-select__button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: @light-text-color;
        background-color: @accent-color;
        padding: 0.3em;
        border-radius: 0px 5px 5px 0px;
    }

    .lb-select__text-field {
        display: block;
        align-items: center;
        color: @dark-text-color;
        background-color: @light-text-color;
        padding: 0.3em;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom: 1px solid @dark-text-color;
    }

    &:hover {
        .lb-select__button {
            background-color: @accent-brighter-color;
        }
    }
  }

  .lb-select__dropdown {
    display: flex;
    flex-direction: column;
    z-index: 9999;

    .lb-select__dropdown-content, .lb-select__no-content {
        position: absolute;
        box-shadow: 2px 2px 2px #727272;
        width: 100%;

        .lb-select__item {
            display: flex;
            flex-direction: row;
            background-color: @canvas-white-color;
            border-bottom: 1px solid @dark-text-color;
            max-height: min-content;
            padding: 0.2em;
            color: @dark-text-color;

            .lb-select__item-icon {
                padding-left: 0.4em;
            }

            &:hover {
                box-shadow: inset 0px 1px 8px rgba(0, 0, 0, 0.2);
            }
        }

        .lb-select__item:last-child {
            border-bottom: none;
        }
    }
  }
}
</style>