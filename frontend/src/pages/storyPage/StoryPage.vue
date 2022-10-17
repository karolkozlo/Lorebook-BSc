<template>
  <div class="story-page">
    <router-view v-if="storyID" :storyID="storyID" :universeID="universeID"></router-view>
  </div>
</template>

<script>

export default {
  name: 'StoryPage',
  props: {
    storyID: {
      type: String,
    },
    universeID: {
      type: String
    }
  },
  data() {
    return {
    };
  },
}
</script>

<style lang="less">
@import '../../common.less';

.story-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

</style>