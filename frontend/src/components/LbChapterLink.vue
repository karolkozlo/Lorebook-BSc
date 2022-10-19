<template>
  <div class="lb-chapter-link">
    <div class="lb-chapter-link__content">
      <div class="lb-chapter-link__category">
        {{ categoryName }}
      </div>
      <div class="lb-chapter-link__name" @click="navigateToElement">
        {{ targetName }}
      </div>
    </div>
    <div class="lb-chapter-link__button">
      <icon :size="1.1" icon="lb-info-circle" class="lb-chapter-link__button-icon"></icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LbChapterLink',
  props: {
    chapterID: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    targetID: {
      type: Number,
      required: true,
    },
    targetName: {
      type: String,
      rquired: true
    },
    categoryID: {
      type: [Number, String],
      required: true
    },
    categoryName: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('universe', ['universeID'])
  },
  methods: {
    navigateToElement() {
      this.$router.push({
        name: 'ElementPage',
        params: {
          universeID: this.universeID,
          categoryID: this.categoryID,
          elementID: this.targetID
        }
      });
    }
  }
}
</script>

<style lang="less">
@import '../common.less';

.lb-chapter-link {
  display: flex;
  width: 100%;
  background-color: @secondary-color;
  color: @light-text-color;
  padding: 0.2em;
  border-bottom: 1px solid @light-text-color;

  .lb-chapter-link__content {
    display: flex;
    flex-direction: column;
    flex: 1;

    .lb-chapter-link__category {
      font-size: 0.8rem;
      color: @neutral-color;
    }

    .lb-chapter-link__name {
      font-weight: 400;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        color: @special-color;
      }
    }
  }

  .lb-chapter-link__button {

    .lb-chapter-link__button-icon {
      color: @light-text-color;
      cursor: pointer;

      &:hover {
        color: @neutral-color;
      }
    }
  }
}

</style>