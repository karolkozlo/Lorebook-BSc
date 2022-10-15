<template>
  <div class="story-page">
    It's story page {{ storyID }}
    <lb-button @click="openPopup">Create new chapter</lb-button>
    <create-chapter-popup v-if="isPopupOpen" :isOpen="isPopupOpen" @close="closePopup" :storyID="storyID"></create-chapter-popup>
  </div>
</template>

<script>
import CreateChapterPopup from '@/popups/CreateChapterPopup.vue';

export default {
  name: 'StoryPage',
  components: {
    CreateChapterPopup
  },
  props: {
    storyID: {
      type: String,
    }
  },
  data() {
    return {
      isPopupOpen: false
    };
  },
  methods: {
    closePopup() {
      this.isPopupOpen = false;
    },
    openPopup() {
      this.isPopupOpen = true;
    }
  }
}
</script>

<style>

</style>