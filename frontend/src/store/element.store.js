import contentElementType from '@/domain/contentElementTypes.js';

const elementModule = {
  namespaced: true,
  state() {
    return {
      contentElements: [],
      contentID: null
    };
  },
  getters: {
    contentElements(state) {
      return state.contentElements;
    },
    contentID(state) {
      return state.contentID;
    },
    config(state) {
      return state.contentElements.map(el => {
        return {
          id: el.id,
          type: el.type
        };
      });
    },
    getElementById: (state) => (id, type) => {
      return state.contentElements.find(el => (el.id == id && el.type == type));
    },
    getListItemById: (state) => (listID, itemID) => {
      const list = state.contentElements.find(el => (el.id == listID && el.type == contentElementType.list));
      if (!list) return null;
      return list.items.find(it => (it.id == itemID));
    },
    getListItemByOrder: (state) => (listID, ordinalNumber) => {
      const list = state.contentElements.find(el => (el.id == listID && el.type == contentElementType.list));
      if (!list) return null;
      return list.items.find(it => (it.ordinalNumber == ordinalNumber));
    },
    getLinkById: (state) => (linkGroupID, linkID) => {
      const group = state.contentElements.find(el => (el.id == linkGroupID && el.type == contentElementType.linkGroup));
      if (!group) return null;
      return group.links.find(it => (it.id == linkID));
    }
  },
  mutations: {
    clearContent(state) {
      state.contentElements = [];
      state.contentID = null;
    },
    setContent(state, contentElements) {
      state.contentElements = contentElements;
    },
    setContentID(state, id) {
      state.contentID = id;
    },
    removeContentElement(state, payload) {
      state.contentElements = state.contentElements.filter(el => { return !(el.id == payload.id && el.type == payload.type); });
    }

  },
};

export default elementModule;