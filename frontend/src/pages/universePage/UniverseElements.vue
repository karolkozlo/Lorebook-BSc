<template>
  <div class="universe-elements">
    <div class="universe-elements__loading">
      <lb-spinner v-if="loading"></lb-spinner>
    </div>
    <div class="universe-elements__list" v-for="elementList in elementLists" :key="elementList.id">
      <lb-universe-element-list
            :categoryID="elementList.id"
            :title="elementList.name"
            :elements="elementList.elements"
            :elementCount="elementList.elementCount"
            :footerLink="elementList.elementCount > 3">
      </lb-universe-element-list>
    </div>
    <div class="universe-elements__no-content" v-if="elementLists.length == 0">
      No elements in this universe
    </div>
  </div>
</template>

<script>
import LbUniverseElementList from '@/components/LbUniverseElementList.vue';
import { getUniverseElementsShortLists } from '@/httpLayers/search.http.js';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: { LbUniverseElementList },
  name: 'UniverseElements',
  data() {
    return {
        elementLists: [],
        loading: false
    };
  },
  computed: {
    ...mapGetters('universe', ['universeID']),
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    async fetchElementLists() {
      this.loading = true;
      try {
        this.elementLists =  await getUniverseElementsShortLists(this.universeID);
        this.elementLists = this.elementLists.filter(el => (el.elementCount)).sort((el2, el1) => {
          if (el1.elements[0].last_modified > el2.elements[0].last_modified) {
            return 1;
          }
          if (el1.elements[0].last_modified < el2.elements[0].last_modified) {
            return -1;
          }
          return 0;
        });
      } catch(error) {
        this.notify({type: 'negative', message: `Error: ${error.message}`});
      } finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    await this.fetchElementLists();
  }
}
</script>

<style lang="less">
@import '../../common.less';

.universe-elements {
  display: flex;
  flex-direction: column;
  margin-top: 0.8em;
  gap: 0.8em;
  max-width: 100%;

  .universe-elements__no-content {
    display: flex;
    justify-content: center;
    font-style: italic;
    font-size: 1.2rem;
  }

  .universe-elements__loading {
    position: relative;
    background-color: @secondary-color;
  }
}

</style>