<template>
  <div class="universe-page">
    {{ `${universeID} : ${universeName}`}}
    <div class="universe-page__content-swapper">
      <lb-content-swapper :options="contentOptions" :activeOption="activeOption" @onSelect="changeContent"></lb-content-swapper>
    </div>
    <categories-popup v-if="isCategoriesPopupOpen"></categories-popup>
    <universe-element-popup v-if="isUniverseElementPopupOpen"></universe-element-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CategoriesPopup from '../popups/CategoriesPopup.vue';
import { getUniverse } from '../httpLayers/universe.http.js';
import LbContentSwapper from '../components/LbContentSwapper.vue';
import UniverseElementPopup from '../popups/UniverseElementPopup.vue';

export default {
    name: 'UniversePage',
    components: {
      CategoriesPopup,
      LbContentSwapper,
      UniverseElementPopup
    },
    data() {
      return {
        contentOptions: [
          {
            name: 'Elements',
            key: 'ElementsComponent',
          },
          {
            name: 'Stories',
            key: 'StoriesComponent',
          }
        ],
        activeOption: 'ElementsComponent'
      };
    },
    computed: {
      ...mapGetters('universe', ['universeName', 'universeID']),
      ...mapGetters('popups',['isCategoriesPopupOpen', 'isUniverseElementPopupOpen'])
    },
    methods: {
      ...mapMutations('universe', ['setUniverse']),
      ...mapMutations('notifications', ['notify']),
      changeContent(contentKey) {
        this.activeOption = contentKey;
      }
    },
    async mounted() {
      const universeID = this.$route.params.universeID;
      try {
        const currentUniverse = await getUniverse(universeID);
        this.setUniverse({ id: currentUniverse.id, name: currentUniverse.name });
      } catch (err) {
        this.notify({type: 'negative', message: `Error: ${err.message}`});
      }
    }
};
</script>

<style lang="less">
@import '../common.less';

.universe-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  .universe-page__content-swapper {
    width: 30%;
  }
}

</style>