<template>
  <div class="lb-universe-nav">
    {{ `${universeID} : ${universeName}`}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'LbUniverseNav',
    computed: {
      ...mapGetters('universe', ['universeName', 'universeID'])
    }
};
</script>

<style lang="less">
@import '../common.less';

</style>