<template>
  <div class="universe-page">
    <div class="universe-page__header">
      <lb-editable-text :value="universeName" :maxLength="45" customClass="universe-page__title" @onSave="changeUniverseTitle"/>
      <label class="universe-page__header-label">Description</label>
      <lb-editable-text :value="universeDescription"
                        :maxLength="1000"
                        type="textarea"
                        customClass="universe-page__description"
                        @onSave="changeDescription"
                        noContent="No description"/>
    </div>
    <div class="universe-page__content-swapper">
      <lb-content-swapper :options="contentOptions" :activeOption="activeOption" @onSelect="changeContent"></lb-content-swapper>
    </div>
    <div class="universe-page__dynamic-content" v-if="universeID">
      <component :is="activeOption"></component>
    </div>
    <categories-popup v-if="isCategoriesPopupOpen"></categories-popup>
    <universe-element-popup v-if="isUniverseElementPopupOpen"></universe-element-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CategoriesPopup from '@/popups/CategoriesPopup.vue';
import { getUniverse, updateUniverse } from '@/httpLayers/universe.http.js';
import LbContentSwapper from '@/components/LbContentSwapper.vue';
import UniverseElementPopup from '@/popups/UniverseElementPopup.vue';
import LbEditableText from '@/components/LbEditableText.vue';
import UniverseElements from './UniverseElements.vue';

export default {
    name: 'UniversePage',
    components: {
      CategoriesPopup,
      LbContentSwapper,
      UniverseElementPopup,
      LbEditableText,
      UniverseElements
    },
    data() {
      return {
        universeDescription: '',
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
      ...mapGetters('popups',['isCategoriesPopupOpen', 'isUniverseElementPopupOpen'])
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
    async mounted() {
      const universeID = this.$route.params.universeID;
      try {
        const currentUniverse = await getUniverse(universeID);
        this.setUniverse({ id: currentUniverse.id, name: currentUniverse.name });
        this.universeDescription = currentUniverse.description;
      } catch (err) {
        this.notify({type: 'negative', message: `Error: ${err.message}`});
      }
    }
};
</script>

<style lang="less">
@import '../../common.less';

.universe-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  .universe-page__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .universe-page__header-label {
      width: 100%;
      text-align: start;
      font-size: 0.9rem;
      color: @secondary-color;
    }

    .universe-page__title {
      font-weight: 600;
      width: 1000px;

      .lb-editable-text__text, .lb-editable-text__input {
        font-size: 2rem;
        text-align: center;
      }
    }

    .universe-page__description {
      margin-top: 2px;
      width: 1000px;
    }
  }

  .universe-page__content-swapper {
    width: 30%;
  }

  .universe-page__dynamic-content {
    width: 80%;
  }
}

</style>