<template>
  <div class="universe-main-page">
    <div class="universe-main-page__header">
      <lb-editable-text :value="universeName" :maxLength="45" customClass="universe-main-page__title" @onSave="changeUniverseTitle"/>
      <label class="universe-main-page__header-label">Description</label>
      <lb-editable-text :value="universeDescription"
                        :maxLength="1000"
                        type="textarea"
                        customClass="universe-main-page__description"
                        @onSave="changeDescription"
                        noContent="No description"/>
    </div>
    <div class="universe-main-page__content-swapper">
      <lb-content-swapper :options="contentOptions" :activeOption="activeOption" @onSelect="changeContent"></lb-content-swapper>
    </div>
    <div class="universe-main-page__dynamic-content" v-if="universeID">
      <component :is="activeOption"></component>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { updateUniverse } from '@/httpLayers/universe.http.js';
import LbContentSwapper from '@/components/LbContentSwapper.vue';
import LbEditableText from '@/components/LbEditableText.vue';
import UniverseElements from './UniverseElements.vue';

export default {
  name: "UnivereseMainPage",
  components: {
      LbContentSwapper,
      LbEditableText,
      UniverseElements
  },
  props: {
    universeDescriptionProp: {
        type: String,
    }
  },
  data() {
      return {
        universeDescription: this.universeDescriptionProp,
        contentOptions: [
          {
            name: 'Elements',
            key: 'universe-elements',
          },
          {
            name: 'Stories',
            key: 'StoriesComponent',
          }
        ],
        activeOption: 'universe-elements'
      };
  },
  computed: {
      ...mapGetters('universe', ['universeName', 'universeID']),
  },
  methods: {
      ...mapMutations('universe', ['setUniverse', 'setUniverseName']),
      ...mapMutations('notifications', ['notify']),
      changeContent(contentKey) {
        this.activeOption = contentKey;
      },
      async changeUniverseTitle(newTitle) {
        try {
          await updateUniverse(this.universeID, { name: newTitle }).then(() => {
            this.setUniverseName(newTitle);
          });
        } catch(error) {
          this.notify({type: 'negative', message: `Error: ${err.message}`});
        }
      },
      async changeDescription(newDescription) {
        try {
          await updateUniverse(this.universeID, { description: newDescription }).then(() => {
            this.universeDescription = newDescription;
          });
        } catch(error) {
          this.notify({type: 'negative', message: `Error: ${err.message}`});
        }
      }
  },
};
</script>

<style lang="less">
@import '../../common.less';

.universe-main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .universe-main-page__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .universe-main-page__header-label {
      width: 100%;
      text-align: start;
      font-size: 0.9rem;
      color: @secondary-color;
    }

    .universe-main-page__title {
      font-weight: 600;
      width: 1000px;

      .lb-editable-text__text, .lb-editable-text__input {
        font-size: 2rem;
        text-align: center;
      }
    }

    .universe-main-page__description {
      margin-top: 2px;
      width: 1000px;
    }
  }

  .universe-main-page__content-swapper {
    width: 30%;
  }

  .universe-main-page__dynamic-content {
    width: 80%;
  }
}
</style>