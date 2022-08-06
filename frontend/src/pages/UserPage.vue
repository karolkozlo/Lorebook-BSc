<template>
  <div class="user-page">
    <section class="user-page__account-section">
        <div class="account-section__header">
            <h2 class="account-section__header-text">Your Account</h2>
            <div class="util__horizontal-line--white"></div>
        </div>
        <div class="account-section__account-data">
            <div class="account-section__data-row">
                <span class="account-section__data-name">Email address: </span>
                <span class="account-section__data-value">{{ email }}</span>
            </div>
            <div class="account-section__data-row">
                <span class="account-section__data-name">Username: </span>
                <span class="account-section__data-value">{{ username }}</span>
                <lb-button icon="lb-edit" :size="1.2"></lb-button>
            </div>
            <div class="account-section__data-row">
                <lb-button icon="lb-edit" :size="1.3">Change password</lb-button>
            </div>
        </div>
    </section>
    <section class="user-page__universe-section">
      <div class="universe-section__header">
        <div class="universe-section__header-part"></div>
        <div class="universe-section__header-title-part">
          <h2>Your Universes</h2>
        </div>
        <div class="universe-section__header-part">
          <lb-button
            class="universe-section__create-button"
            @click="openUniverseCreator"
            icon="lb-plus"
            :size="1.2">Create New Universe</lb-button>
        </div>
      </div>
      <table class="universe-section__universes-table">
        <tr class="universes-table__row universes-table__row--header">
          <th class="universes-table__cell">Universe</th>
          <th class="universes-table__cell">Elements</th>
          <th class="universes-table__cell"></th>
        </tr>
        <tr class="universes-table__row" v-for="uni in universes" :key="uni.id">
          <td class="universes-table__cell">
            <router-link class="universes-table__link" to="/user">
                {{ uni.name }}
            </router-link>
          </td>
          <td class="universes-table__cell">
            <span>{{ uni.elementCount }}</span>
          </td>
          <td class="universes-table__cell universes-table__cell--button">
            <lb-button variant="negative" icon="lb-cancel"></lb-button>
          </td>
        </tr>
      </table>
    </section>
    <create-universe-popup :isOpen="isCreateUniverseOpen" @close="closeUniverseCreator"></create-universe-popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateUniversePopup from '../popups/CreateUniversePopup.vue';

export default {
  name: "UserPage",
  components: {
    CreateUniversePopup
  },
  data() {
    return {
      isCreateUniverseOpen: false,
      universes: [
        {
          id: 1,
          name: "Some universe",
          elementCount: 10,
        },
        {
          id: 2,
          name: "Another universe with some longer name",
          elementCount: 14,
        },
        {
          id: 3,
          name: "Test Universe",
          elementCount: 2,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["username", "email", "username"]),
  },
  methods: {
    openUniverseCreator() {
      this.isCreateUniverseOpen = true;
    },
    closeUniverseCreator() {
      this.isCreateUniverseOpen = false;
    }
  }
};
</script>

<style lang="less">
@import "../common.less";

.user-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  .user-page__account-section {
    display: flex;
    flex-direction: column;
    min-width: 60%;
    background-color: @secondary-color;
    border-radius: 10px;
    padding: 1em;
    margin-bottom: 50px;

    .account-section__header {
        display: flex;
        flex-direction: column;
        align-items: center;

        .account-section__header-text {
            color: @light-text-color;
            font-size: 2rem;
            margin: 0;
            padding-bottom: 0.3em;
        }
    }

    .account-section__account-data {
        font-size: 1.4rem;
        .account-section__data-row {
            display: flex;
            align-items: center;
            color: @light-text-color;
            padding: 0.3em;

           .account-section__data-name {
                margin-right: 10px;
                font-weight: 600;
           }

           .account-section__data-value {
                margin-right: 10px;
           }
        }
    }
  }

  .user-page__universe-section {
    display: flex;
    flex-direction: column;
    min-width: 60%;

    .universe-section__header {
      display: flex;
      align-items: center;

      .universe-section__header-title-part {
        display: flex;
        justify-content: center;
        flex: 1;
      }

      .universe-section__header-part {
        display: flex;
        justify-content: flex-end;
        flex: 1;
      }
    }

    .universe-section__universes-table {
      border-spacing: 0;

      .universes-table__row {
        background-color: @element-color;
        padding: 0.5em;

        &--header {
          background-color: @secondary-color;
          font-size: 1.2rem;

          .universes-table__cell {
            text-align: start;
            color: @light-text-color;
            font-weight: 700;
          }
        }

        .universes-table__cell {
          border-bottom: 1px solid @dark-text-color;
          padding: 0.5em;
          font-weight: 600;

          .universes-table__link {
            text-decoration: none;
            color: @dark-text-color;

            &:hover {
              text-decoration: underline;
              color: @accent-color;
            }
          }

          &--button {
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>