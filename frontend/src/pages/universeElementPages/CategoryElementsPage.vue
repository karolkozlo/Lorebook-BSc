<template>
  <div class="category-elements-page">
    <div class="category-elements-page__search-section">
      <lb-search-bar :placeholder="`Search elements in ${categoryName}`" @search="search"></lb-search-bar>
    </div>
    <div class="category-elements-page__results">
      <lb-universe-element-list
            :categoryID="categoryID"
            :title="categoryName"
            :elements="elements"
            :elementCount="elementCount"
            :footerLink="false"
            :interactive="true"
            :loading="loading"
            @onDelete="deleteElement">
      </lb-universe-element-list>
      <lb-page-nav :currentPage="currentPage" :totalPages="totalPages" @go="changePage" v-if="!loading"></lb-page-nav>
    </div>
  </div>
</template>

<script>
import LbPageNav from '../../components/LbPageNav.vue';
import LbSearchBar from '../../components/LbSearchBar.vue';
import LbUniverseElementList from '../../components/LbUniverseElementList.vue';

export default {
  components: {
    LbSearchBar,
    LbUniverseElementList,
    LbPageNav
  },
  name: 'CategoryElementsPage',
  props: {
    categoryID: {
        type: String
    },
    categoryName: {
      type: String,
    }
  },
  data() {
    return {
      elements: [
        {
          id: 1,
          name: 'Name',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null',
          last_modified: new Date()
        }
      ],
      elementCount: 45,
      currentPage: 1,
      totalPages: 45,
      loading: false
    };
  },
  methods: {
    search(queryText) {
      console.log(queryText);
    },
    changePage(newPageNumber) {
      this.currentPage = newPageNumber;
    },
    deleteElement({id, categoryID}) {
      console.log('Delete '+id+' from '+categoryID);
    }
  }
};
</script>

<style lang="less">

.category-elements-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;

  .category-elements-page__search-section {
    width: 800px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .category-elements-page__results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    gap: 1em;
  }
}
</style>