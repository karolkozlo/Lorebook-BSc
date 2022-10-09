<template>
  <div class="universe-stories">
    <div class="universe-stories__header">
      <div class="universe-stories__header-part"></div>
      <div class="universe-stories__header-part universe-stories__header-part--title">
        Your Stories
      </div>
      <div class="universe-stories__header-part">
        <lb-button icon="lb-plus" :size="1.2" @click="openPopup">Create new Story</lb-button>
      </div>
    </div>
    <div class="universe-stories__list">
      <div class="util__horizontal-line--black"></div>
      <div class="universe-stories__list-elements" :style="storiesListVisibility">
        <div class="universe-stories__list--no-content" v-if="storiesList.length == 0">
          No Stories in this Universe
        </div>
      </div>
      <lb-spinner v-if="loading"></lb-spinner>
    </div>
    <create-story-popup v-if="isPopupOpen" :isOpen="isPopupOpen" @close="closePopup" @onResult="addStory"></create-story-popup>
  </div>
</template>

<script>
import CreateStoryPopup from '@/popups/CreateStoryPopup.vue';

export default {
  name: 'UniverseStories',
  components: {
    CreateStoryPopup
  },
  data() {
    return {
      loading: false,
      storiesList: [],
      isPopupOpen: false
    };
  },
  computed: {
    storiesListVisibility() {
      return this.loading ? 'visibility: hidden;' : '';
    }
  },
  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    addStory(newStory) {
      console.log('Created Story', newStory);
    }
  }
}
</script>

<style lang="less">
@import '../../common.less';

.universe-stories {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
  gap: 1em;
  max-width: 100%;

  .universe-stories__header {
    display: flex;
    align-items: center;
    width: 80%;

    .universe-stories__header-part {
      display: flex;
      flex: 1;
      justify-content: flex-end;

      &--title {
        justify-content: center;
        font-size: 2rem;
        font-weight: 600;
      }
    }
  }

  .universe-stories__list {
    display: flex;
    flex-direction: column;
    width: 80%;
    position: relative;

    .universe-stories__list-elements {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0.2em;

      .universe-stories__list--no-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3em 6em;
        border-radius: 10px;
        background-color: @secondary-color;
        color: @light-text-color;
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
  }
}

</style>