const popupModule = {
    namespaced: true,
    state() {
        return {
            isCategoriesPopupOpen: false,
            isUniverseElementPopupOpen: false,
        };
    },
    getters: {
        isCategoriesPopupOpen(state) {
            return state.isCategoriesPopupOpen;
        },
        isUniverseElementPopupOpen(state) {
            return state.isUniverseElementPopupOpen;
        },
    },
    mutations: {
        openCategoriesPopup(state) {
            state.isCategoriesPopupOpen = true;
        },
        closeCategoriesPopup(state) {
            state.isCategoriesPopupOpen = false;
        },
        openUniverseElementPopup(state) {
            state.isUniverseElementPopupOpen = true;
        },
        closeUniverseElementPopup(state) {
            state.isUniverseElementPopupOpen = false;
        },
    },
};

export default popupModule;