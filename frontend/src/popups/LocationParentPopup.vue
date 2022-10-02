<template>
  <lb-popup-box :isOpen="isOpen" title="Set Parent Location" @close="close">
    <div class="location-parent-popup">
      <div class="location-parent-popup__field">
        <div class="location-parent-popup__name">
          Current Parent:
          <span class="location-parent-popup__name-value">{{ currentParentName }}</span>
        </div>
      </div>
      <div class="location-parent-popup__field">
        <lb-search-bar :placeholder="`Search location...`" @search="search" :text="searchText"></lb-search-bar>
      </div>
      <div class="location-parent-popup__field">
        <lb-select-list :items="filteredLocations"
                        :loading="locationsLoading"
                        :selectedID="parentID"
                        @onSelect="selectParent"
                        maxHeight="250px">
        </lb-select-list>
      </div>
      <div class="location-parent-popup__field">
        <lb-page-nav :currentPage="currentPage"
                     :totalPages="totalPages"
                     @go="changePage"
                     class="location-parent-popup__page-nav"
                     v-if="totalPages != 1">
        </lb-page-nav>
      </div>
      <div class="location-parent-popup__buttons">
        <lb-button variant="outline" :size="1.4" @click="close">Cancel</lb-button>
        <lb-button variant="positive" :size="1.4" @click="setParent" :loading="setParentLoading">Set Parent</lb-button>
      </div>
    </div>
  </lb-popup-box>
</template>

<script>
import LbSearchBar from '@/components/LbSearchBar.vue';
import LbSelectList from '@/components/LbSelectList.vue';
import LbPageNav from '@/components/LbPageNav.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'LocationParentPopup',
  components: {
    LbSearchBar,
    LbSelectList,
    LbPageNav
  },
  emits: ['close', 'onResult'],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    locationID: {
      type: Number,
    },
    currentParentID: {
      type: Number,
    },
    currentParentName: {
      type: String,
    },
  },
  data() {
    return {
      parentID: this.currentParentID,
      parentName: this.currentParentName,
      searchText: '',
      locationsLoading: false,
      locations: [],
      currentPage: 1,
      totalPages: 2,
      setParentLoading: false,
    };
  },
  computed: {
    ...mapGetters('universe', ['universeID']),
    filteredLocations() {
      return this.locations.filter(l => {
        return l.id !== locationID && l.Location_id !== locationID;
      });
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    selectParent(selection) {
      this.parentID = this.parentID !== selection ? selection : null;
      if (this.parentID !== null) {
        this.parentName = this.filteredLocations.find(l => l.id == this.parentID).name;
      } else {
        this.parentName = null;
      }
    },
    async search(queryText) {
      const page = this.currentPage == 1 ? 0 : this.currentPage;
      console.log(queryText);
    },
    async changePage(newPageNumber) {
      this.currentPage = newPageNumber;
      await this.search(this.searchText);
    },
    async setParent() {
      this.$emit('onResult', {
        id: this.parentID,
        name: this.parentName
      });
      this.close();
    }
  }
};
</script>

<style lang="less">
@import '../common.less';

.location-parent-popup {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 800px;

  .location-parent-popup__field {
    display: flex;
    flex-direction: column;
    width: 100%;

    .location-parent-popup__name {
      color: @dark-text-color;
      font-size: 1.3rem;
      font-weight: 500;

      .location-parent-popup__name-value {
        font-size: 1.3rem;
        font-weight: 400;
      }
    }

    .location-parent-popup__page-nav {
      align-self: center;
      width: auto;
    }
  }

  .location-parent-popup__buttons {
    display: flex;
    justify-content: space-between;
  }
}

</style>