<template>
  <div class="universe-elements">
    <lb-universe-element-list :title="'Characters'" :elements="elements"></lb-universe-element-list>
  </div>
</template>

<script>
import LbUniverseElementList from '@/components/LbUniverseElementList.vue'

export default {
  components: { LbUniverseElementList },
  name: 'UniverseElements',
  data() {
    return {
        elements: [
            {
                id: 1,
                name: 'Some Name',
                description: 'Some description etc.',
                lastModified: '24.08.2022 18:52'
            },
            {
                id: 2,
                name: 'Another Name',
                description: '',
                lastModified: '24.08.2022 12:30'
            },
            {
                id: 3,
                name: 'Some LOOOOONGEEEEEER Name. Seriously, it is longer',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio',
                lastModified: '22.08.2022 15:30'
            },
        ]
    };
  }
}
</script>

<style lang="less">
@import '../../common.less';

</style>