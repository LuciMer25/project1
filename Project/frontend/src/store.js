import { createStore } from "vuex";
import persistedstate from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      user: null,
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
  },
  getters: {
    isLoggedIn: state => !!state.user, // 로그인 상태 확인
    getUserInfo: state => state.user, // 사용자 정보 가져오기
    getItemList: state => state.itemList,
    getUserInfo: state => state.user,
  },
  plugins: [persistedstate({ paths: ["user"] })],
});

export default store;
  