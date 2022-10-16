<template>
  <lb-popup-box :isOpen="isOpen" title="Create Chapter" @close="$emit('close')">
    <div class="create-chapter-popup" :style="setVisibilityOnLoading">
      <div class="create-chapter-popup__form">
        <lb-input name="Chapter Title"
                          :maxLength="80"
                          :value="title"
                          @update:value="setTitle"
                          :error="titleError"></lb-input>
        <lb-input name="Description" type="textarea" v-model:value="description" :maxLength="500"></lb-input>
      </div>
        <div class="create-chapter-popup__buttons">
          <lb-button variant="outline" :size="1.4" @click="$emit('close')">Cancel</lb-button>
          <lb-button variant="positive" :size="1.4" @click="create" :disabled="!isFormValid">Create</lb-button>
        </div>
      </div>
    <lb-spinner size="50px" v-if="loading"></lb-spinner>
  </lb-popup-box>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import LbInput from '@/components/LbInput.vue';
import { createChapter } from '@/httpLayers/chapter.http.js';

export default {
  name: 'CreateChapterPopup',
  components: {
    LbInput
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    storyID: {
      type: String,
      required: true
    },
    ordinalNumber: {
      type: Number,
      required: true
    }
  },
  emits: ["close", "onResult"],
  data() {
    return {
      loading: false,
      title: '',
      titleError: '',
      description: '',
    };
  },
  computed: {
    setVisibilityOnLoading() {
      return this.loading ? 'visibility: hidden;' : 'visibility: visible;';
    },
    isFormValid() {
     if(this.titleError == '') {
        if(this.title.length > 0) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    setTitle(newTitle) {
      this.titleError = '';
      this.title = newTitle;
      if (this.title.length < 1) {
        this.titleError = 'Title cannot be empty!';
      }
    },
    async create() {
      try {
        this.loading = true;
        const createdChapter = await createChapter(this.title, this.description, this.ordinalNumber, this.storyID);
        this.$emit('onResult', createdChapter);
        this.$emit('close');
      } catch (error) {
        this.notify({type: 'negative', message: error.message});
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less">
@import '../common.less';

.create-chapter-popup {
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 800px;

  .create-chapter-popup__form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .create-chapter-popup__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>