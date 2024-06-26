import { createStore } from "vuex";
//import persistedstate from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      user: {},
      itemList: []
    };
  },
  mutations: {
    user(state, data) {
      state.user = data;
    },
    setItemList(state, itemList) {
      state.itemList = itemList;
    }
  },
  actions: {
    updateItemList({ commit }, itemList) {
      commit('setItemList', itemList);
    },
    updateLoginInfo({ commit }, user) {
      commit('user', user);
    }
  },
  getters: {
    getItemList: state => state.itemList,
    getUserInfo: state => state.user,
  },
  //plugins: [persistedstate({ paths: ["user"] })],
});

export default store;
  