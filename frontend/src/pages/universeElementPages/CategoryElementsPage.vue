<template>
  <div class="category-elements-page">
    <div class="category-elements-page__search-section">
      <lb-search-bar :placeholder="`Search elements in ${categoryName}`" @search="search" :text="searchText"></lb-search-bar>
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
import { mapGetters, mapMutations } from 'vuex';
import LbPageNav from '../../components/LbPageNav.vue';
import LbSearchBar from '../../components/LbSearchBar.vue';
import LbUniverseElementList from '../../components/LbUniverseElementList.vue';
import { searchCharacters, deleteCharacter } from '@/httpLayers/character.http.js';
import { searchEntries, deleteEntry } from '@/httpLayers/entry.http.js';
import { searchLocations, deleteLocation } from '@/httpLayers/location.http.js';
import { searchEvents, deleteEvent } from '@/httpLayers/event.http.js';

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
      elementCount: 0,
      currentPage: 1,
      totalPages: 1,
      loading: false,
      searchText: '',
    };
  },
  computed: {
    ...mapGetters('universe', ['universeID']),
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    async fetchElements(queryText, page) {
      this.searchText = queryText;
      const elementsPerPage = 2;
      this.loading = true;
      try {
        let result = null;
        switch (this.categoryID) {
          case 'Locations':
            result = await searchLocations(this.universeID, queryText, elementsPerPage, page);
            break;
          case 'Characters':
            result = await searchCharacters(this.universeID, queryText, elementsPerPage, page);
            break;
          case 'Events':
            result = await searchEvents(this.universeID, queryText, elementsPerPage, page);
            break;
          default:
            result = await searchEntries(this.categoryID, queryText, elementsPerPage, page);
            break;
        }
        this.elementCount = result.count;
        this.elements = result.rows;
        this.totalPages = Math.ceil(this.elementCount / elementsPerPage);
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${err.message}`});
      } finally {
        this.loading = false;
      }
    },
    async search(queryText) {
      const page = this.currentPage == 1 ? 0 : this.currentPage;
      await this.fetchElements(queryText, page);
    },
    async changePage(newPageNumber) {
      this.currentPage = newPageNumber;
      await this.search(this.searchText);
    },
    async deleteElement({id, categoryID}) {
      if (confirm('Are yo sure that you want delete this element?')) {
        this.loading = true;
      try {
        let result = null;
        switch (categoryID) {
          case 'Locations':
            result = await deleteLocation(id);
            break;
          case 'Characters':
            result = await deleteCharacter(id);
            break;
          case 'Events':
            result = await deleteEvent(id);
            break;
          default:
            result = await deleteEntry(id);
            break;
        }
        if (result) {
          this.notify({type: 'positive', message: `Successfully deleted element`});
          await this.search(this.searchText);
        }
      } catch (error) {
        this.notify({type: 'negative', message: `Error: ${err.message}`});
      } finally {
        this.loading = false;
      }
    }
    }
  },
  watch: {
    async categoryID() {
      this.searchText = '';
      await this.fetchElements('', 0);
    }
  },
  async mounted() {
    await this.fetchElements('', 0);
  },
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