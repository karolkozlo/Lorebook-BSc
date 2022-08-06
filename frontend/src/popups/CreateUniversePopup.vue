<template>
    <lb-popup-box :isOpen="isOpen" title="Create New Universe" @close="close">
        <div class="create-universe-popup" :style="setVisibilityOnLoading">
            <div class="create-universe-popup__form">
                <lb-input name="Title of universe"
                          :maxLength="45"
                          :value="title.value"
                          @update:value="setTitle"
                          :error="title.errorMsg"></lb-input>
                <lb-input name="Description" type="textarea" v-model:value="description"></lb-input>
            </div>
            <div class="create-universe-popup--buttons">
                <lb-button variant="outline" :size="1.4" @click="close">Cancel</lb-button>
                <lb-button variant="positive" :size="1.4" @click="create" :disabled="!isFormValid">Create</lb-button>
            </div>
        </div>
        <lb-spinner size="50px" v-if="loading"></lb-spinner>
    </lb-popup-box>
</template>

<script>
import LbInput from '../components/LbInput.vue';

export default {
  components: { LbInput },
  name: 'CreateUniversePopup',
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
    setTitle(newValue) {
        this.title.errorMsg = '';
        this.title.value = newValue;
        if (newValue.length < 1) {
            this.title.errorMsg = 'Title cannot be empty!';
        }
    },
    create() {
        this.loading = true;
        setTimeout(() => { this.loading = false }, 3000);
        console.log("Title: ", this.title.value);
        console.log("Description: ", this.description);
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

};
</script>

<style lang="less">
@import '../common.less';

.create-universe-popup {
    display: flex;
    flex-direction: column;
    padding: 1em;
    width: 800px;

    .create-universe-popup__form {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .create-universe-popup--buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
}

</style>