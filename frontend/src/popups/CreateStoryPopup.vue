<template>
  <lb-popup-box :isOpen="isOpen" title="Create Story" @close="close">
    <div class="create-story-popup" :style="setVisibilityOnLoading">
      <div class="create-story-popup__form">
        <lb-input name="Story Title"
                          :maxLength="80"
                          :value="title.value"
                          @update:value="setTitle"
                          :error="title.errorMsg"></lb-input>
        <lb-input name="Description" type="textarea" v-model:value="description" :maxLength="500"></lb-input>
      </div>
      <div class="create-story-popup__buttons">
        <lb-button variant="outline" :size="1.4" @click="close">Cancel</lb-button>
        <lb-button variant="positive" :size="1.4" @click="create" :disabled="!isFormValid">Create</lb-button>
      </div>
    </div>
    <lb-spinner size="50px" v-if="loading"></lb-spinner>
  </lb-popup-box>
</template>

<script>
import LbInput from '../components/LbInput.vue';
import { mapGetters, mapMutations } from "vuex";
import { createStory } from '@/httpLayers/story.http.js';

export default {
  name: 'CreateStoryPopup',
  components: {
    LbInput
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "onResult"],
  data() {
    return {
      title: {
        value: '',
        errorMsg: ''
      },
      description: '',
      loading: false
    };
  },
  computed: {
    ...mapGetters('universe', ['universeID']),
    setVisibilityOnLoading() {
      return this.loading ? 'visibility: hidden;' : 'visibility: visible;';
    },
    isFormValid() {
     if(this.title.errorMsg == '') {
        if(this.title.value.length > 0) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    setTitle(newValue) {
      this.title.errorMsg = '';
      this.title.value = newValue;
      if (newValue.length < 1) {
        this.title.errorMsg = 'Title cannot be empty!';
      }
    },
    async create() {
      this.loading = true;
      try {
        const createdStory = await createStory({
          title: this.title.value,
          description: this.description,
          universeID: this.universeID
        });
        this.$emit('onResult', createdStory);
        this.close();
      } catch (error) {
        this.notify({type: 'negative', message: error.message});
      } finally {
        this.loading = false;
      }
    },
    close() {
      this.title = {
        value: '',
        errorMsg: ''
      },
      this.description = '';
      this.$emit('close');
    }
  }
}
</script>

<style lang="less">
@import '../common.less';

.create-story-popup {
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 800px;

  .create-story-popup__form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .create-story-popup__buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>