<template>
  <div class="lb-universe-nav">
    <router-link class="lb-universe-nav__universe-button" :to="`/universe/${universeID}`">
      <div class="lb-universe-nav__universe-button-header">
        <span>Universe</span>
      <div class="util__horizontal-line--white"></div>
      </div>
      <span class="lb-universe-nav__universe-link">
        {{ universeName }}
      </span>
    </router-link>
    <button class="lb-universe-nav__button">
      <icon icon="lb-plus-square"></icon>
      <span class="lb-universe-nav__button-text">Create Element</span>
    </button>
    <button class="lb-universe-nav__button" @click="openCategoriesPopup">
      <icon icon="lb-folder"></icon>
      <span class="lb-universe-nav__button-text">Categories</span>
    </button>
    <button class="lb-universe-nav__button">
      <icon icon="lb-tags"></icon>
      <span class="lb-universe-nav__button-text">Tags</span>
    </button>
    <button class="lb-universe-nav__button">
      <icon icon="lb-search"></icon>
      <span class="lb-universe-nav__button-text">Search</span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'LbUniverseNav',
    computed: {
      ...mapGetters('universe', ['universeName', 'universeID']),
      ...mapGetters('popups', ['isCategoriesPopupOpen'])
    },
    methods: {
      ...mapMutations('popups', ['openCategoriesPopup']),
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-universe-nav {
  display: flex;
  height: 100%;
  gap: 0.4em;
  width: 100%;

  .lb-universe-nav__universe-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    background-color: @accent-color;
    color: @light-text-color;
    max-width: 300px;
    text-decoration: none;

    &:hover {
      background-color: @accent-darker-color;
    }

    .lb-universe-nav__universe-button-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 500;
    }

    .lb-universe-nav__universe-link {
      font-size: 0.9rem;
      text-align: center;
      color: @light-text-color;
    }
  }

  .lb-universe-nav__button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    gap: 10px;
    font-size: 1.2rem;
    background-color: @accent-color;
    color: @light-text-color;

    &:hover {
      background-color: @accent-darker-color;
    }
  }
}

</style>