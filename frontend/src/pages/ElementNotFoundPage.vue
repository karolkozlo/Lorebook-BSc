<template>
  <div class="element-not-found-page">
    <div class="element-not-found-page__title">
      Page Not Found
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElementNotFoundPage',

}
</script>

<style lang="less">
@import "../common.less";

.element-not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
  width: 100%;

  .element-not-found-page__title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4em;
    font-size: 2rem;
    font-weight: 600;
    color: @light-text-color;
    background-color: @secondary-color;
    border-radius: 1em;
  }
}

</style>