<template>
  <div class="universe-page">
    <router-view :universeDescriptionProp="universeDescription" v-if="!loading"></router-view>
    <lb-spinner v-if="loading" size="40px"></lb-spinner>
    <categories-popup v-if="isCategoriesPopupOpen"></categories-popup>
    <universe-element-popup v-if="isUniverseElementPopupOpen"></universe-element-popup>
    <tags-popup v-if="isTagsPopupOpen"></tags-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import CategoriesPopup from '@/popups/CategoriesPopup.vue';
import { getUniverse } from '@/httpLayers/universe.http.js';
import UniverseElementPopup from '@/popups/UniverseElementPopup.vue';
import TagsPopup from '@/popups/TagsPopup.vue';

export default {
    name: 'UniversePage',
    components: {
      CategoriesPopup,
      UniverseElementPopup,
      TagsPopup
    },
    data() {
      return {
        universeDescription: '',
        loading: false,
      };
    },
    computed: {
      ...mapGetters('universe', ['universeID']),
      ...mapGetters('popups', ['isCategoriesPopupOpen', 'isUniverseElementPopupOpen', 'isTagsPopupOpen'])
    },
    methods: {
      ...mapMutations('universe', ['setUniverse', 'setUniverseName']),
      ...mapMutations('notifications', ['notify']),
    },
    async mounted() {
      const universeID = this.$route.params.universeID;
      this.loading = true;
      try {
        const currentUniverse = await getUniverse(universeID);
        this.setUniverse({ id: currentUniverse.id, name: currentUniverse.name });
        this.universeDescription = currentUniverse.description;
      } catch (err) {
        this.notify({type: 'negative', message: `Error: ${err.message}`});
        this.$route.replace({ name: 'User' });
      } finally {
        this.loading = false;
      }
    }
};
</script>

<style lang="less">
@import '../../common.less';

.universe-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

</style>