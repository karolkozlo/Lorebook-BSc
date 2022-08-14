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
            <span class="universes-table__link" @click="navigateToUniverse(uni.id)">
                {{ uni.name }}
            </span>
          </td>
          <td class="universes-table__cell">
            <span>{{ uni.elementCount }}</span>
          </td>
          <td class="universes-table__cell universes-table__cell--button">
            <lb-button variant="negative" icon="lb-cancel" @click="deleteUniverse(uni.id, uni.name)"></lb-button>
          </td>
        </tr>
      </table>
    </section>
    <create-universe-popup :isOpen="isCreateUniverseOpen" @close="closeUniverseCreator" @onResult="onCreateUniverse"></create-universe-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getUserUniverseList, removeUniverse } from '../httpLayers/universe.http.js';
import CreateUniversePopup from '../popups/CreateUniversePopup.vue';

export default {
  name: "UserPage",
  components: {
    CreateUniversePopup
  },
  data() {
    return {
      isCreateUniverseOpen: false,
      universes: [],
    };
  },
  computed: {
    ...mapGetters(["username", "email", "userID"]),
    ...mapGetters('universe', ['userUniverses'])
  },
  methods: {
    ...mapMutations('notifications', ['notify']),
    ...mapMutations('universe', ['setUniverse', 'setUserUniverses', 'pushUserUniverse', 'removerUserUniverse']),
    openUniverseCreator() {
      this.isCreateUniverseOpen = true;
    },
    closeUniverseCreator() {
      this.isCreateUniverseOpen = false;
    },
    async fetchUserUniverseList() {
      try {
        this.universes = await getUserUniverseList(this.userID);
      } catch (error) {
        console.error(error.message);
      }
    },
    async deleteUniverse(universeID, universeName) {
      try {
        if(confirm(`Are you sure that you want delete ${universeName} universe?`)) {
          const result = await removeUniverse(universeID);
          if (result) {
            this.universes = this.universes.filter((uni)=> uni.id !== universeID);
            this.removerUserUniverse(universeID);
          }
        }
      } catch (err) {
        this.notify({type: 'negative', message: `Error: ${err.message}`});
      }
    },
    onCreateUniverse(result) {
      if(result) {
        this.notify({type: 'positive', message: 'Universe Created'});
        let createdUniverse = result;
        this.pushUserUniverse({id: createdUniverse.id, name: createdUniverse.name});
        createdUniverse.elementCount = 0;
        this.universes.push(createdUniverse);
        this.isCreateUniverseOpen = false;
      }
    },
    navigateToUniverse(universeID) {
      const currentUniverse = this.userUniverses.find(uni => {return uni.id === universeID});
      if(currentUniverse) {
        this.$router.push(`/universe/${currentUniverse.id}`);
      }
    }
  },
  async mounted() {
    await this.fetchUserUniverseList();
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