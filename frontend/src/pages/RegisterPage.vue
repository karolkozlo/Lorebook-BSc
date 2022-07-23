<template>
  <div class="register-page">
    <div class="register-page__form">
      <div :style="isFormVisible">
        <h1 class="register-page__header">Create new account</h1>
        <div class="util__horizontal-line--white"></div>
        <div class="register-page__inputs">
          <lb-input :name="'Username'"
                    :value="username.value"
                    @update:value="setUsername"
                    :maxLength="45"
                    :error="username.errorMsg"/>
          <lb-input :name="'Email address'"
                    type="email" :value="email.value"
                    @update:value="setEmail"
                    :maxLength="45"
                    :error="email.errorMsg"/>
          <lb-input :name="'Password'"
                    type="password"
                    :value="password.value"
                    @update:value="setPassword"
                    :maxLength="60"
                    :error="password.errorMsg"/>
          <lb-input :name="'Confirm Password'"
                    type="password"
                    :value="passwordConfirm.value"
                    @update:value="setPasswordConfirm"
                    :maxLength="60"
                    :error="passwordConfirm.errorMsg"/>
        </div>
        <div class="register-page__bottom">
          <router-link to="/login" class="register-page__link">Already have an account? Log In</router-link>
          <lb-button @click="register" :size="1.2" :disabled="isButtonDisabled">Register</lb-button>
        </div>
      </div>
      <lb-spinner v-if="loading" size="70px" thickness="10px"></lb-spinner>
    </div>
  </div>
</template>

<script>
import LbInput from "../components/LbInput.vue";

export default {
  name: "RegisterPage",
  components: {
    LbInput,
  },
  data() {
    return {
      username: {
        value: '',
        errorMsg: ''
      },
      email: {
        value: '',
        errorMsg: ''
      },
      password: {
        value: '',
        errorMsg: ''
      },
      passwordConfirm: {
        value: '',
        errorMsg: ''
      },
      loading: false,
    };
  },
  computed: {
    isButtonDisabled() {
        if( this.username.value.length === 0
            || this.email.value.length === 0
            || this.password.value.length === 0
            || this.passwordConfirm.value.length === 0 ) {
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
    setUsername(newValue) {
        this.username.errorMsg = '';
        this.username.value = newValue;
    },
    setEmail(newValue) {
      this.email.value = newValue;
      if(!this.email.value.includes('@') && this.email.value.length > 0) {
        this.email.errorMsg = 'Email should contain "@"';
      } else {
        this.email.errorMsg = '';
      }
    },
    setPassword(newValue) {
      this.password.value = newValue;
      this.password.errorMsg = '';
      if(this.passwordConfirm.value.length > 0 && this.passwordConfirm.value != this.password.value) {
        this.passwordConfirm.errorMsg = 'Passwords do not match'
      } else {
        this.passwordConfirm.errorMsg = '';
      }
    },
    setPasswordConfirm(newValue) {
      this.passwordConfirm.value = newValue;
      if(this.passwordConfirm.value != this.password.value) {
        this.passwordConfirm.errorMsg = 'Passwords do not match'
      } else {
        this.passwordConfirm.errorMsg = '';
      }
    },
    formValidation() {
     if(this.username.errorMsg == '' && this.password.errorMsg == '' && this.passwordConfirm.errorMsg == '' && this.email.errorMsg == '') {
        if(this.username.value.length > 0 && this.password.value.length > 0 && this.passwordConfirm.value.length > 0 && this.email.value.length > 0) {
          return true;
        }
      }
      return false;
    },
    register() {
      this.loading = true;
      if(this.formValidation) {
        console.log("USER DATA");
        console.log(this.username.value);
        console.log(this.email.value);
        console.log(this.password.value);
        console.log(this.passwordConfirm.value);
      }
      setTimeout(() => {
        this.loading = false;
      }, 2000)
    },
  },
};
</script>

<style lang="less">
@import "../common.less";

.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .register-page__form {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1.7em;
    border-radius: 15px;
    width: ~"max(50%, 700px)";
    background-color: @secondary-color;

    .register-page__header {
      text-align: center;
      margin: 0;
      color: @light-text-color;
      font-size: 2rem;
      font-weight: 500;
    }

    .register-page__inputs {
      display: flex;
      flex-direction: column;
      gap: 1em;
      padding: 1.5em 1em;
    }

    .register-page__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5em 1em;

      .register-page__link {
        color: @light-text-color;

        &:hover {
            color: @special-color;
        }
      }
    }
  }
}
</style>