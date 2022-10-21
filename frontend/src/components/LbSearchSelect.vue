<template>
  <div class="lb-search-select" >
    <div class="lb-search-select__control">
      <div :style="isControlVisible" class="lb-search-select__control-content">
        <div class="lb-search-select__selection" v-if="selectedItem !== null">
          <span>{{ selectedItem.name }}</span>
          <icon icon="lb-cancel" @click="removeSelection" class="lb-search-select__remove-button" :size="1.2"></icon>
        </div>
        <input type="text"
              v-model="value"
              :placeholder="placeholder"
              v-if="selectedItem === null"
              class="lb-search-select__input"
              :disabled="loading"/>
      </div>
      <lb-spinner v-if="loading" size="1.3rem"></lb-spinner>
    </div>
    <div class="lb-search-select__dropdown" v-show="isDropdownOpen">
        <div class="lb-search-select__dropdown-content" v-if="filteredItems.length > 0">
            <div class="lb-search-select__item" v-for="(item, index) in filteredItems" :key="index" @click="selectItem(index)">
                <span class="lb-search-select__item-text">
                    {{ item.name }}
                </span>
            </div>
        </div>
        <div v-if="filteredItems.length == 0" class="lb-search-select__no-content">
          No items
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'LbSearchSelect',
    props: {
      items: {
        type: Array,
        default: []
      },
      placeholder: {
        type: String,
        default: ''
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    emits: ["onSelection"],
    data() {
      return {
        selectedItem: null,
        value: '',
      };
    },
    computed: {
      filteredItems() {
        if (this.value.length > 0) {
          return this.items.filter(it => {
            return it.name.toLowerCase().includes(this.value.toLowerCase());
          });
        }
        return this.items;
      },
      isDropdownOpen() {
        return this.selectedItem === null && !this.loading;
      },
      isControlVisible() {
        if(this.loading) {
          return 'visibility: hidden;';
        }
        return 'visibility: visible;';
      }
    },
    methods: {
      selectItem(index) {
        this.selectedItem = this.filteredItems[index];
        this.$emit('onSelection', this.selectedItem.id);
        this.value = '';
      },
      removeSelection() {
        this.selectedItem = null;
        this.$emit('onSelection', null);
        this.value = '';
      }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-search-select {
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: 'Roboto';

  .lb-search-select__control {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: fade(@canvas-white-color, 50%);
    border: 1px solid @dark-text-color;
    border-radius: 10px;
    padding: 0em 0.4em;

    .lb-search-select__control-content {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &:focus-within {
      background-color: fade(@canvas-white-color, 70%);
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    .lb-search-select__input {
      width: 100%;
      background-color: transparent;
      font-size: 1.3rem;
      border: none;
      padding: 0px;
      font-family: 'Roboto';

      &:focus {
        outline: none;
      }
    }

    .lb-search-select__selection {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 0.4em;
      font-size: 1.3rem;
      font-family: 'Roboto';

      .lb-search-select__remove-button:hover {
        color: @accent-darker-color;
      }
    }
  }

  :not(.lb-search-select__control:focus-within) + .lb-search-select__dropdown {
    display: none;
    &:focus, &:active  {
      display: flex;
    }
  }

  .lb-search-select__dropdown {
    display: flex;
    flex-direction: column;

    .lb-search-select__dropdown-content, .lb-search-select__no-content {
      display: block;
      z-index: 9997;
      position: absolute;
      width: 100%;
      overflow-y: scroll;
      max-height: 50vh;
      background-color: @canvas-white-color;
      color: @dark-text-color;


      .lb-search-select__item {
            display: flex;
            flex-direction: row;
            background-color: @canvas-white-color;
            color: @dark-text-color;
            border-bottom: 1px solid @dark-text-color;
            max-height: min-content;
            padding: 0.2em;

            .lb-search-select__item-text {
              font-size: 1.2rem;
            }
        }

        .lb-search-select__item:last-child {
            border-bottom: none;
        }
    }
  }
}

</style>