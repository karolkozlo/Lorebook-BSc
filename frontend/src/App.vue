<template>
  <main>
    <nav class="main__nav">
      <router-link class="main__nav-link" to="/">Home</router-link>
      <router-link class="main__nav-link" to="/register">Register</router-link>
    </nav>
    <div class="main__content">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
@import './common.less';

html {
  font-size: 16px;
}

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
  min-height: 100vh;
  font-family: 'Roboto';
  background-color: @tertiary-color;

  .main__nav {
    display: flex;
    background-color: @primary-color;
    padding: 5px;
    gap: 10px;

    .main__nav-link {
      color: white;
      font-size: 1.2em;
    }
  }

  .main__content {
    padding: 1em;
  }
}
</style>

