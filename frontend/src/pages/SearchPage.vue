<template>
  <div class="search-page">
    <div class="search-page__filter-section">
      <lb-search-bar :placeholder="`Search elements by name...`" @search="search" :text="searchText"></lb-search-bar>
      <div class="search-page__filters">
        <lb-select placeholder="All categories"
                   :items="categories"
                   :loading="categoriesLoading"
                   :multiselect="true"
                   :width="'50%'">
        </lb-select>
        <lb-tag-container :tags="tags"
                          @addTag="addTag"
                          @removeTag="removeTag">
        </lb-tag-container>
      </div>
    </div>
    <div class="search-page__result-section">
      <h2 class="search-page__result-section-header">Results</h2>
      <table class="search-page__element-table">
        <tr class="element-table__row element-table__row--header">
          <th class="element-table__cell">
            <div class="element-table__cell-content">
              <icon icon="lb-link"></icon>
              <span> Name </span>
            </div>
          </th>
          <th class="element-table__cell">
            <div class="element-table__cell-content">
              <icon icon="lb-folder"></icon>
              <span> Category </span>
            </div>
          </th>
          <th class="element-table__cell">Last modified</th>
        </tr>
        <tr class="element-table__row" v-for="(el, index) in elements" :key="index">
          <td class="element-table__cell">
            <span class="element-table__link" @click="navigateToElement(el.id, el.categoryID)">
              {{ el.name }}
            </span>
          </td>
          <td class="element-table__cell">
            <span>{{ el.categoryName }}</span>
          </td>
          <td class="element-table__cell element-table__cell--shrink">
            {{ formatDate(el.last_modified) }}
          </td>
        </tr>
      </table>
      <div class="search-page__no-results">

      </div>
    </div>
  </div>
</template>

<script>
import LbSearchBar from '@/components/LbSearchBar.vue';
import LbSelect from '@/components/LbSelect.vue';
import LbTagContainer from '@/components/LbTagContainer.vue';
import { v4 } from 'uuid';
import { mapGetters, mapMutations } from 'vuex';
import { getUniverseCategories } from '@/httpLayers/category.http.js';
import { format } from 'date-fns';

export default {
  name: 'SearchPage',
  components: {
    LbSearchBar,
    LbSelect,
    LbTagContainer
  },
  data() {
    return {
      searchText: '',
      tags: [],
      categories: [],
      categoriesLoading: false,
      elements: [
        {
          id: 1,
          name: 'Jakaś Lokacja',
          categoryID: 'Locations',
          categoryName: 'Locations',
          last_modified: '2022-08-24T19:25:54.000Z'
        },
        {
          id: 4,
          name: 'Jeszcze inna postać do wywalenia',
          categoryID: 'Characters',
          categoryName: 'Characters',
          last_modified: '2022-08-24T19:25:54.000Z'
        },
        {
          id: 5,
          name: 'Inne coś',
          categoryID: 1,
          categoryName: 'Stworzenia',
          last_modified: '2022-08-24T19:25:54.000Z'
        },
      ]
    };
  },
  computed: {
    ...mapGetters('universe', ['universeID']),
    selectedCategories() {
      return this.categories.filter(cat => (cat.selected))
                            .map(cat => (cat.id));
    }
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    formatDate(date) {
      const isoDate = new Date(date);
      const formattedDate = format(isoDate, 'dd.MM.yyyy hh:mm');
      return formattedDate;
    },
    navigateToElement(elID, catID) {
      this.$router.push({
        name: 'ElementPage',
        params: {
          universeID: this.universeID,
          categoryID: catID,
          elementID: elID
        }
      })
    },
    async search(query) {
      this.searchText = query;
      console.log("Search");
      console.log("searchText: ", query);
      console.log('tags: ', this.tags);
      console.log('categories: ', this.selectedCategories);
    },
    addTag(tagName) {
      this.tags.push({
        id: v4(),
        name: tagName
      });
    },
    removeTag(id) {
      this.tags = this.tags.filter(t => (t.id !== id));
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
  },
  async mounted() {
    this.fetchCategories();
  }
};
</script>

<style lang="less">
@import '../common.less';

.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  padding: 1em;
  gap: 1em;

  .search-page__filter-section {
    display: flex;
    flex-direction: column;
    width: ~"max(60%, 800px)";
    gap: 1em;

    .search-page__filters {
      display: flex;
      gap: 0.5em;
    }
  }

  .search-page__result-section {
    width: 80%;

    .search-page__result-section-header {
      display: flex;
      justify-content: center;
    }

    .search-page__element-table {
      background-color: @secondary-color;
      color: @light-text-color;
      border-spacing: 0;
      width: 100%;
      padding: 0.5em;
      border-radius: 10px;

      .element-table__row {
        font-size: 1.2rem;
        &--header {
          font-size: 1.4rem;

          .element-table__cell {
            border-bottom: 2px solid @light-text-color;
            font-weight: 600;
            text-align: start;
          }
        }
      }

      .element-table__cell {
        border-bottom: 1px solid @light-text-color;
        font-weight: 400;
        padding: 0.5em 0em;
        width: 50%;

        .element-table__link {
          font-weight: 500;
          cursor: pointer;

          &:hover {
            color: @special-color;
          }
        }

        .element-table__cell-content {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: 0.3em;
        }

        &--shrink {
          width: fit-content;
          white-space: nowrap;
        }
      }
    }
  }
}

</style>