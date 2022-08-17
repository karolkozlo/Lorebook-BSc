<template>
  <div class="universe-page">
    {{ `${universeID} : ${universeName}`}}
    <categories-popup></categories-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CategoriesPopup from '../popups/CategoriesPopup.vue';
import { getUniverse } from '../httpLayers/universe.http.js';

export default {
    name: 'UniversePage',
    components: {
      CategoriesPopup
    },
    computed: {
      ...mapGetters('universe', ['universeName', 'universeID'])
    },
    methods: {
      ...mapMutations('universe', ['setUniverse']),
      ...mapMutations('notifications', ['notify']),
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

</style>