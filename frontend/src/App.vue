<template>
  <main>
    <lb-header/>
    <div class="main__content">
      <lb-toast :type="notificationType" :message="notificationMessage" :isOpen="isNotificationOpen" @close="closeNotification"></lb-toast>
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import LbHeader from './components/LbHeader.vue';
import { mapMutations, mapGetters } from 'vuex';
import LbToast from './components/LbToast.vue';

export default {
  name: "App",
  components: {
    LbHeader,
    LbToast
  },
  computed: {
    ...mapGetters('notifications', ['isNotificationOpen', 'notificationMessage', 'notificationType'])
  },
  methods: {
    ...mapMutations(['setUser']),
    ...mapMutations('notifications', ['closeNotification'])
  }
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
  height: 100vh;
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
    position: relative;
    overflow-y: auto;
    height: 100%;
  }
}
</style>

