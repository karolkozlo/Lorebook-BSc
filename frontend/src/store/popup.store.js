const popupModule = {
    namespaced: true,
    state() {
        return {
            isCategoriesPopupOpen: false,
            isUniverseElementPopupOpen: false,
            isLinkPopupOpen: false,
            isTagsPopupOpen: false
        };
    },
    getters: {
        isCategoriesPopupOpen(state) {
            return state.isCategoriesPopupOpen;
        },
        isUniverseElementPopupOpen(state) {
            return state.isUniverseElementPopupOpen;
        },
        isLinkPopupOpen(state) {
            return state.isLinkPopupOpen;
        },
        isTagsPopupOpen(state) {
            return state.isTagsPopupOpen;
        }
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
        openLinkPopup(state) {
            state.isLinkPopupOpen = true;
        },
        closeLinkPopup(state) {
            state.isLinkPopupOpen = false;
        },
        openTagsPopup(state) {
            state.isTagsPopupOpen = true;
        },
        closeTagsPopup(state) {
            state.isTagsPopupOpen = false;
        }
    },
};

export default popupModule;