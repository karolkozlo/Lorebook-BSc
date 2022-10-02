<template>
  <div class="location-parent-section">
    <h3 class="location-parent-section__header">
      Parent Location
      <lb-button icon="lb-edit" :size="0.8" @click="openPopup"></lb-button>
    </h3>
    <div class="location-parent-section__parent" v-if="parentName" @click="navigateToParent">
      <icon icon="lb-link"></icon>
      <span>{{ parentName }}</span>
    </div>
    <div class="location-parent-section__no-content" v-if="!parentName">
      No Parent Location
    </div>
    <location-parent-popup v-if="isPopupOpen"
                           :isOpen="isPopupOpen"
                           :locationID="id"
                           :currentParentID="parentID"
                           :currentParentName="parentName"
                           @close="closePopup"
                           @onResult="setParent">
    </location-parent-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LocationParentPopup from '@/popups/LocationParentPopup.vue';

export default {
  name: 'LocationParentSection',
  components: {
    LocationParentPopup
  },
  props: {
    element: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      id: this.element.id,
      parentName: this.element.parentName,
      parentID: this.element.parentID,
      isPopupOpen: false,
    }
  },
  computed: {
    ...mapGetters('universe', ['universeID']),
  },
  methods: {
    closePopup() {
      this.isPopupOpen = false;
    },
    openPopup() {
      this.isPopupOpen = true;
    },
    navigateToParent() {
      this.$router.push({
        name: 'ElementPage',
        params: {
          universeID: this.universeID,
          categoryID: 'Locations',
          elementID: this.parentID
        }
      });
    },
    setParent(newParent) {
      this.parentID = newParent.id;
      this.parentName = newParent.name;
    }
  }
};
</script>

<style lang="less">
@import "../../common.less";

.location-parent-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: @light-text-color;
  margin-bottom: 1em;
  gap: 10px;

  .location-parent-section__header {
    display: flex;
    gap: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  .location-parent-section__parent {
    display: flex;
    align-items: center;
    gap: 0.3em;
    cursor: pointer;
    padding: 0em 0.4em;

    &:hover {
      color: @special-color;
      span {
        text-decoration: underline;
      }
    }
  }

  .location-parent-section__no-content {
    font-style: italic;
    font-weight: 400;
  }
}

</style>