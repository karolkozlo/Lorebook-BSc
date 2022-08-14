import { getUserUniverses } from "../httpLayers/universe.http";

const initialCategories = [
    {
        id: 'Characters',
        name: 'Characters'
    },
    {
        id: 'Locations',
        name: 'Locations'
    },
    {
        id: 'Events',
        name: 'Events'
    },
];

const universeModule = {
    namespaced: true,
    state() {
        return {
            universeID: null,
            universeName: null,
            categories: initialCategories,
            userUniverses: [],
            universesFetchedFlag: false
        };
    },
    getters: {
        universeID(state) {
            return state.universeID;
        },
        universeName(state) {
            return state.universeName;
        },
        universeCategories(state) {
            return state.categories;
        },
        userUniverses(state) {
            return state.userUniverses;
        },
        checkIfUserOwnsUniverse: (state) => (payload) => {
            return state.userUniverses.find(uni => {
                return uni.id == payload.universeID;
            });
        },
        universesFetchedFlag(state) {
            return state.universesFetchedFlag;
        }
    },
    mutations: {
        setUniverse(state, payload) {
            state.universeID = payload.id;
            state.universeName = payload.name;
        },
        clearUniverse(state) {
            state.universeID = null;
            state.universeName = null;
            state.categories = initialCategories
        },
        setCategories(state, payload) {
            state.categories = [...state.categories, payload.customCategories];
        },
        setUserUniverses(state, universes) {
            state.userUniverses = universes;
        },
        setUniversesFetchedFlag(state, value) {
            state.universesFetchedFlag = value;
        },
        pushUserUniverse(state, payload) {
            state.userUniverses.push(payload);
        },
        removerUserUniverse(state, universeID) {
            state.userUniverses = state.userUniverses.filter(uni => uni.id !== universeID);
        },
        clearUserUniverses(state) {
            state.userUniverses = [];
        }
    },
    actions: {
        async fetchUserUniverses(context) {
            try {
                if (context.rootGetters.userID) {
                    const universes = await getUserUniverses(context.rootGetters.userID);
                    context.commit('setUserUniverses', universes);
                    context.commit('setUniversesFetchedFlag', true);
                }
            } catch (error) {
                context.commit('notifications/notify', {type: 'negative', message: `${error.message}`}, { root: true });
            }
        }
    }
};

export default universeModule;