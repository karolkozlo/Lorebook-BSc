<template>
  <header class="lb-header">
    <nav class="lb-header__nav">
        <div class="lb-header__nav-left">
            <router-link class="lb-header__link" to="/">Home</router-link>
        </div>
        <div class="lb-header__nav-right">
            <router-link class="lb-header__link lb-header__link--account" :to="setLink">
                <span class="lb-header__account-text">{{ setAccountLinkText }}</span>
                <icon icon="lb-user" :size="1.5"></icon>
            </router-link>
            <lb-button v-if="this.username" icon="lb-logout" :size="1.5" @click="logOut"></lb-button>
        </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { logoutUser } from '../httpLayers/login.http.js';

export default {
    name: 'LbHeader',
    computed: {
        ...mapGetters(['username']),
        setAccountLinkText() {
            return this.username ? this.username : 'Log In';
        },
        setLink() {
            return this.username ? '/user' : '/login';
        }
    },
    methods: {
        ...mapMutations(['clearUser']),
        async logOut() {
            try {
                await logoutUser();
            }
            catch(err) {
                console.error(err.message);
            } finally {
                this.clearUser();
                this.$router.push('/login');
            }
        }
    }
};
</script>

<style lang="less">
@import '../common.less';

.lb-header {
    display: flex;
    background-color: @primary-color;
    padding: 5px;

    .lb-header__nav {
        display: flex;
        gap: 10px;
        width: 100%;
        padding: 0.5em;

        .lb-header__nav-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 1;
        }

        .lb-header__nav-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex: 1;
            gap: 15px;
        }

        .lb-header__link {
            color: white;
            font-size: 1.2em;
            text-decoration: none;

            &--account {
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
                gap: 10px;
            }
        }
    }
}

</style>