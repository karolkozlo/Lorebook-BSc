<template>
  <lb-popup-box :isOpen="isCategoriesPopupOpen" title="Categories in current universe" @close="close">
    <div class="categories-popup">
        <div class="categories-popup__form">
          <lb-input name="Name" :value="categoryName" @update:value="setName" :error="categoryNameError" :maxLength="45"></lb-input>
          <div class="categories-popup__buttons" :class="setButtonsClass">
            <lb-button
                v-if="selectedCategory === null"
                :size="1.2"
                variant="positive"
                icon="lb-plus"
                @click="addCategory"
                :disabled="disableFormButtons"
                :loading="isAddCategoryLoading">Add new category</lb-button>
            <lb-button
                v-if="selectedCategory !== null"
                :size="1.2"
                variant="outline"
                @click="cancelEdit">Cancel</lb-button>
            <lb-button
                v-if="selectedCategory !== null"
                :size="1.2"
                icon="lb-edit"
                @click="renameCategory"
                :disabled="disableFormButtons">Rename</lb-button>
          </div>
        </div>
        <div class="categories-popup__categories-table">
          <table class="categories-table">
            <thead>
              <tr class="categories-table__row categories-table__row--header">
                <th class="categories-table__cell categories-table__cell--header">Category</th>
                <th class="categories-table__cell categories-table__cell--header">Elements</th>
                <th class="categories-table__cell categories-table__cell--header"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="categories-table__row" :class="isRowEdited(cat.id)" v-for="cat in categoriesList" :key="cat.id">
                <td class="categories-table__cell">{{ cat.name }}</td>
                <td class="categories-table__cell">{{ cat.elementCount }}</td>
                <td class="categories-table__cell">
                  <div class="categories-table__buttons" v-if="isCategoryMutable(cat.id)">
                    <lb-button :size="1.2" icon="lb-edit" @click="editCategory(cat.id)"></lb-button>
                    <lb-button
                        :size="1.2"
                        icon="lb-trash"
                        variant="negative"
                        @click="deleteCategory(cat.id)"
                        :disabled="this.selectedCategory == cat.id"></lb-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  </lb-popup-box>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import LbInput from '../components/LbInput.vue';
import {
  getUniverseCategoryList,
  createCategory,
  removeCategory,
  updateCategory
} from '../httpLayers/category.http.js';

export default {
    name: 'CategoriesPopup',
    components: {
      LbInput,
    },
    props: {
    },
    emits: ["onResult"],
    data() {
      return {
          categoryName: '',
          categoryNameError: '',
          loading: false,
          selectedCategory: null,
          categoriesList: [],
          isAddCategoryLoading: false,
      };
    },
    computed: {
      ...mapGetters('popups', ['isCategoriesPopupOpen']),
      ...mapGetters('universe', ['universeID']),
      setButtonsClass() {
        if(this.selectedCategory !== null) {
          return 'categories-popup__buttons--rename-mode';
        }
        return '';
      },
      disableFormButtons() {
        if(this.categoryName.length < 1 || this.categoryNameError.length > 0) {
          return true;
        }
        return false;
      },
      isCategoryNameValid() {
        return this.categoryName.length > 0 && !this.categoriesList.find(cat => {return cat.name === this.categoryName})
      },
    },
    methods: {
      ...mapMutations('popups', ['closeCategoriesPopup']),
      ...mapMutations('notifications', ['notify']),
      close() {
        this.closeCategoriesPopup();
      },
      setName(newValue) {
        this.categoryNameError = '';
        this.categoryName = newValue;
      },
      isCategoryMutable(categoryID) {
        return !['Locations', 'Characters', 'Events'].includes(categoryID);
      },
      isRowEdited(id) {
        if (this.selectedCategory == id) {
          return 'categories-table__row--edited';
        } else {
          return '';
        }
      },
      editCategory(id) {
        if (this.selectedCategory == id) {
          this.selectedCategory = null;
          this.categoryName = '';
        } else {
          this.selectedCategory = id;
          this.categoryName = this.categoriesList.find(cat => cat.id == id).name;
        }
      },
      cancelEdit() {
        this.selectedCategory = null;
        this.categoryName = '';
      },
      async addCategory() {
        if( this.isCategoryNameValid ) {
          this.isAddCategoryLoading = true;
          try {
            const createdCategory = await createCategory({ name: this.categoryName, universeID: this.universeID });
            this.categoriesList.push({id: createdCategory.id, name: this.categoryName, elementCount: 0});
            this.categoryName = '';
          } catch (error) {
            this.notify({ type: 'negative', message: error.message });
          } finally {
            this.isAddCategoryLoading = false;
          }
        } else {
          this.categoryNameError = 'Category with that name already exists';
        }
      },
      async renameCategory() {
        if( this.isCategoryNameValid ) {
          try {
            await updateCategory(this.selectedCategory, this.categoryName);
            this.categoriesList.find(cat => cat.id == this.selectedCategory).name = this.categoryName;
            this.selectedCategory = null;
            this.categoryName = '';
          } catch (error) {
            this.notify({ type: 'negative', message: error.message });
          }
        } else {
          this.categoryNameError = 'Category with that name already exists';
        }
      },
      async deleteCategory(id) {
        if(confirm('Do you really want to delete this category? You will lose all elements belonging in this category. It cannot be undone!')) {
          try {
            await removeCategory(id);
            this.categoriesList = this.categoriesList.filter(cat => cat.id !== id);
          } catch (error) {
            this.notify({ type: 'negative', message: error.message });
          }
        }
      }
    },
    async mounted() {
      try {
        this.categoriesList = await getUniverseCategoryList(this.universeID);
      } catch(error) {
        this.notify({ type: 'negative', message: error.message });
      }
    }
};
</script>

<style lang="less">
@import '../common.less';

.categories-popup {
  display: flex;
  flex-direction: column;
  width: 800px;

  .categories-popup__form {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;

    .categories-popup__buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 1em;

      &--rename-mode {
        justify-content: space-between;
      }
    }
  }

  .categories-popup__categories-table {
    display: flex;
    flex-direction: column;
    max-height: 50vh;
    overflow-y: auto;

    .categories-table {
      border-spacing: 0;

      .categories-table__row {
        background-color: @element-color;
        padding: 0.5em;

        &--header {
          background-color: @secondary-color;
          font-size: 1.2rem;
        }

        &--edited {
          box-shadow: inset 0px 3px 15px rgba(0, 0, 0, 0.3);
        }

        .categories-table__cell {
          border-bottom: 1px solid @dark-text-color;
          padding: 0.5em;
          font-weight: 600;
          color: @dark-text-color;

          &--header {
            text-align: start;
              color: @light-text-color;
              font-weight: 700;
          }

          .categories-table__buttons {
            display: flex;
            justify-content: flex-end;
            gap: 5px;
          }
        }
      }
    }
  }
}

</style>