<template>
  <lb-popup-box :isOpen="isLinkPopupOpen" title="Create Link" @close="close">
    <div class="link-popup">
      <div>
        <h2 class="link-popup__field-title">Type of target</h2>
        <lb-select :items="categories"
                   width="100%"
                   placeholder="Select type of link target"
                   :loading="categoriesLoading"
                   @handleSelection="selectCategory"/>
      </div>
      <div class="link-popup__search-field" v-if="selectedCategory !== null">
        <h2 class="link-popup__field-title">Target</h2>
        <lb-search-bar :placeholder="`Search target`" @search="search" :text="searchText"></lb-search-bar>
        <lb-select-list :items="filteredElements"
                        :loading="areElementsLoading"
                        :selectedID="targetElementID"
                        @onSelect="selectTargetElement"
                        maxHeight="250px">
        </lb-select-list>
        <lb-page-nav :currentPage="currentPage"
                     :totalPages="totalPages"
                     @go="changePage"
                     class="link-popup__page-nav"
                     v-if="!areElementsLoading && currentPage != 1"></lb-page-nav>
      </div>
      <lb-input name="Description" type="textarea" v-model:value="description" :maxLength="250"/>
      <div class="link-popup__buttons">
        <lb-button variant="outline" :size="1.4" @click="close">Cancel</lb-button>
        <lb-button variant="positive" :size="1.4" @click="createLink" :disabled="isCreateButtonDisabled" :loading="createLoading">Create Link</lb-button>
      </div>
    </div>
  </lb-popup-box>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import LbInput from '@/components/LbInput.vue';
import LbSelect from '@/components/LbSelect.vue';
import LbSelectList from '@/components/LbSelectList.vue';
import LbSearchBar from '@/components/LbSearchBar.vue';
import LbPageNav from '@/components/LbPageNav.vue';
import { getUniverseCategories } from '@/httpLayers/category.http.js';
import { searchElements } from '@/httpLayers/universeElement.interface.js';


export default {
  name: 'LinkPopup',
  emits: ["onResult"],
  components: {
    LbInput,
    LbSelect,
    LbSelectList,
    LbSearchBar,
    LbPageNav
  },
  props: {
    chapterID: {
      type: Number,
      default: null
    },
    linkGroupID: {
      type: Number,
      default: null
    },
    elementID: {
      type: Number,
      default: null
    },
    elementCategoryID: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      createLoading: false,
      description: '',
      categories: [],
      selectedCategory: null,
      categoriesLoading: false,
      elements: [],
      targetElementID: null,
      areElementsLoading: false,
      searchText: '',
      currentPage: 1,
      totalPages: 1
    };
  },
  computed: {
    ...mapGetters('popups', ['isLinkPopupOpen']),
    ...mapGetters('universe', ['universeID']),
    isCreateButtonDisabled() {
      if(this.selectedCategory === null || this.targetElementID === null) {
        return true;
      }
      return false;
    },
    filteredElements() {
      if (this.selectedCategory == this.elementCategoryID) {
        return this.elements.filter(el => (el.id != this.elementID));
      }
      return this.elements;
    }
  },
  methods: {
    ...mapMutations('popups', ['closeLinkPopup']),
    ...mapMutations('notifications', ['notify']),
    close() {
      this.closeLinkPopup();
    },
    async fetchCategories() {
      try {
        this.categoriesLoading = true;
        const basicCategories = [
                {
                    id: 'Characters',
                    name: 'Characters'
                },
                {
                    id: 'Locations',
                    name: 'Locations'
                },
                {
                    id: 'Events',
                    name: 'Events'
                }
        ];
        const customCategories = await getUniverseCategories(this.universeID);
        this.categories.push(...basicCategories, ...customCategories);
      } catch(error) {
        this.notify({ type: 'negative', message: error.message });
      } finally {
        this.categoriesLoading = false;
      }
    },
    async fetchElements(queryText, page) {
      this.searchText = queryText;
      const elementsPerPage = 25;
      this.areElementsLoading = true;
      try {
        const result = await searchElements(this.universeID, queryText, elementsPerPage, page, this.selectedCategory)
        this.elementCount = result.elementCount;
        this.elements = result.elements;
        this.totalPages = result.totalPages;
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${err.message}`});
      } finally {
        this.areElementsLoading = false;
      }
    },
    async selectCategory(selection) {
      this.selectedCategory = selection.length ? selection[0].id : null;
      if (this.selectedCategory !== null) {
        this.targetElementID = null;
        this.searchText = '';
        this.currentPage = 1;
        await this.search(this.searchText);
      }
    },
    async selectTargetElement(selection) {
      this.targetElementID = this.targetElementID !== selection ? selection : null;
    },
    async search(queryText) {
      const page = this.currentPage == 1 ? 0 : this.currentPage;
      await this.fetchElements(queryText, page);
    },
    async changePage(newPageNumber) {
      this.currentPage = newPageNumber;
      await this.search(this.searchText);
    },
    async createLink() {
      try {
        const category = this.categories.find(cat => (cat.id == this.selectedCategory));
        const targetElement = this.elements.find(el => (el.id == this.targetElementID));
        console.log('linkGroupID: ', this.linkGroupID);
        console.log('targetElement: ', targetElement.id, targetElement.name);
        console.log('targetCategory: ', category.id, category.name);
        console.log('description: ', this.description);
        this.createLoading = true;
      } catch (error) {
        this.notify({ type: 'negative', message: error.message });
      } finally {
        this.createLoading = false;
      }
    }
  },
  async mounted() {
    await this.fetchCategories();
  }
};
</script>

<style lang="less">
@import '../common.less';

.link-popup {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 1000px;
  max-height: 80vh;
  overflow-y: auto;

  .link-popup__search-field {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .link-popup__page-nav {
      align-self: center;
      width: 300px;
    }
  }

  .link-popup__field-title {
    margin: 0;
    margin-right: 0.5em;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 1.4rem;
    color: @light-text-color;
  }

  .link-popup__buttons {
    display: flex;
    justify-content: space-between;
  }
}

</style>