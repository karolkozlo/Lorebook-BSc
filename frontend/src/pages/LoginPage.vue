<template>
  <div class="login-page">
    <div class="login-page__form">
      <div :style="isFormVisible">
        <h1 class="login-page__header">Log In</h1>
        <div class="util__horizontal-line--white"></div>
        <div class="login-page__inputs">
          <lb-input :name="'Username'"
                    :value="username.value"
                    @update:value="setUsername"
                    :maxLength="45"
                    :error="username.errorMsg"/>
          <lb-input :name="'Password'"
                    type="password"
                    :value="password.value"
                    @update:value="setPassword"
                    :maxLength="60"
                    :error="password.errorMsg"/>
        </div>
        <div class="login-page__bottom">
          <router-link to="/register" class="login-page__link">Don't have an account? Sign Up</router-link>
          <lb-button @click="logIn" :size="1.2" :disabled="isButtonDisabled">Log In</lb-button>
        </div>
      </div>
      <lb-spinner v-if="loading" size="70px" thickness="10px"></lb-spinner>
      <lb-popup-box v-if="isErrorOpen" :isOpen="isErrorOpen" title="Error" :message="resultMessage" :variant="resultType" @close="closeError"></lb-popup-box>
    </div>
  </div>
</template>

<script>
import LbInput from "../components/LbInput.vue";
import { loginUser } from "@/httpLayers/login.http.js";
import LbPopupBox from '../components/LbPopupBox.vue';
import { mapMutations, mapActions } from 'vuex';
import LbSearchSelect from '../components/LbSearchSelect.vue';

export default {
  name: "LoginPage",
  components: {
    LbInput,
    LbPopupBox,
    LbSearchSelect,
  },
  data() {
    return {
      username: {
        value: '',
        errorMsg: ''
      },
      password: {
        value: '',
        errorMsg: ''
      },
      loading: false,
      isErrorOpen: false,
      resultMessage: '',
      resultType: 'negative',
    };
  },
  computed: {
    isButtonDisabled() {
        if( this.username.value.length === 0 || this.password.value.length === 0 ) {
            return true;
        }
        return false;
    },
    isFormVisible() {
      if(this.loading) {
        return 'visibility: hidden;';
      }
      return 'visibility: visible;';
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    ...mapActions('universe', ['fetchUserUniverses']),
    setUsername(newValue) {
      this.username.value = newValue;
      this.username.errorMsg = '';
    },
    setPassword(newValue) {
      this.password.value = newValue;
      this.password.errorMsg = '';
    },
    formValidation() {
     if(this.password.errorMsg == '' && this.username.errorMsg == '') {
        if(this.password.value.length > 0 && this.username.value.length > 0) {
          return true;
        }
      }
      return false;
    },
    closeError() {
      this.isErrorOpen = false;
      this.resultMessage = '';
    },
    async logIn() {
      this.loading = true;
      let start = Date.now();
      let result = null;
      if(this.formValidation()) {
        try {
          result = await loginUser(this.username.value, this.password.value);
        } catch(err) {
          this.loading = false;
          this.isErrorOpen = true;
          this.resultMessage = err.message;
        }
        if(result) {
          let timeRemaining = Date.now() - start;
          if(timeRemaining < 500) {
            setTimeout( async () => {
              this.loading = false;
              this.setUser(result);
              await this.fetchUserUniverses(result.id);
              this.$router.push('/user');
            }, 500 - timeRemaining);
          } else {
            this.loading = false;
            this.setUser(result);
            await this.fetchUserUniverses(result.id);
            this.$router.push('/user');
          }
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less">
@import "../common.less";

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1em;

  .login-page__form {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1.7em;
    border-radius: 15px;
    width: ~"max(50%, 700px)";
    background-color: @secondary-color;

    .login-page__header {
      text-align: center;
      margin: 0;
      color: @light-text-color;
      font-size: 2rem;
      font-weight: 500;
    }

    .login-page__inputs {
      display: flex;
      flex-direction: column;
      gap: 1em;
      padding: 1.5em 1em;
    }

    .login-page__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5em 1em;

      .login-page__link {
        color: @light-text-color;

        &:hover {
            color: @special-color;
        }
      }
    }
  }
}
</style>