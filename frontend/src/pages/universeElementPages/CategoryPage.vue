<template>
  <div class="category-page">
    <router-view v-if="!this.loading" :categoryName="categoryName"></router-view>
  </div>
</template>

<script>
import { getCategory } from '@/httpLayers/category.http.js';
import { mapMutations } from 'vuex';
import { isCategoryHardcoded } from '@/utils.js';

export default {
    name: 'CategoryPage',
    props: {
      universeID: String,
    },
    data() {
      return {
        loading: true,
        categoryName: '',
      };
    },
    methods: {
      ...mapMutations('notifications', ['notify']),
      async fetchCategory(categoryID) {
        this.loading = true;
        try {
          if ( !isCategoryHardcoded(categoryID) ) {
            const category = await getCategory(categoryID);
            if (this.universeID != category.Universe_id) {
              throw new Error('This category does not belong to this universe');
            }
            this.categoryName = category.name;
          } else {
            this.categoryName = categoryID;
          }
          this.loading = false;
        } catch (err) {
          this.notify({type: 'negative', message: `Error: ${err.message}`});
          this.$router.replace({ name: 'UniverseMainPage', params: { universeID: this.universeID }});
        }
      }
    },
    async mounted() {
      await this.fetchCategory(this.$route.params.categoryID);
    },
    async beforeRouteUpdate(to, from) {
      await this.fetchCategory(to.params.categoryID);
    }
}
</script>

<style lang="less">
@import '../../common.less';

.category-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>