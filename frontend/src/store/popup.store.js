const popupModule = {
    namespaced: true,
    state() {
        return {
            isCategoriesPopupOpen: false,
        };
    },
    getters: {
        isCategoriesPopupOpen(state) {
            return state.isCategoriesPopupOpen;
        },
    },
    mutations: {
        openCategoriesPopup(state) {
            state.isCategoriesPopupOpen = true;
        },
        closeCategoriesPopup(state) {
            state.isCategoriesPopupOpen = false;
        },
    },
};

export default popupModule;