<template>
  <main>
    <nav class="main__nav">
      <router-link class="main__nav-link" to="/">Home</router-link>
    </nav>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
@import './common.less';

body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

main {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 95vh;

  .main__nav {
    background-color: @primary-color;
    padding: 5px;

    .main__nav-link {
      color: white;
      font-size: 1.2em;
    }
  }
}
</style>

