import { createStore } from "vuex";
import persistedstate from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      user: null,
      receiver:null,
      itemList: []
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setReceiver(state, receiver) {
      state.receiver = receiver;
    },
    clearReceiver(state) {
      state.receiver = null;
    },
    setItemList(state, itemList) {
      state.itemList = itemList;
    }
  },
  actions: {
    loginUser({ commit }, user) {
      // 로그인 액션
      commit('setUser', user);
    },
    logoutUser({ commit }) {
      // 로그아웃 액션
      commit('clearUser');
    },
    updateItemList({ commit }, itemList) {
      commit('setItemList', itemList);
    },
    updateLoginInfo({ commit }, user) {
      commit('setUser', user);
    },
    updateReceiverInfo({ commit }, receiver) {
      commit('setReceiver', receiver);
    },
  },
  getters: {
    isLoggedIn: state => !!state.user, // 로그인 상태 확인
    getUserInfo: state => state.user, // 사용자 정보 가져오기
    getItemList: state => state.itemList,
    getReceiver: state => state.receiver,
  },
  plugins: [persistedstate({ paths: ["user"] })],
});

export default store;