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
};

export default universeModule;