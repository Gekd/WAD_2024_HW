import { createStore } from 'vuex';

const store = createStore({
  state: {
    userFeed: [],
    loading: false,
  },
  mutations: {
    SET_FEED(state, feed) {
      state.userFeed = feed;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    INCREMENT_LIKES(state, index) {
      if (!state.userFeed[index].like_count) {
        state.userFeed[index].like_count = 0;
      }
      state.userFeed[index].like_count++;
    },
    RESET_LIKES(state) {
      state.userFeed.forEach((post) => {
        post.like_count = 0;
      });
    },
  },
  actions: {
    fetchFeed({ commit }) {
      commit('SET_LOADING', true);
      fetch('/user_data.json')
        .then((response) => response.json())
        .then((data) => {
          commit('SET_FEED', data.user_feed);
          commit('SET_LOADING', false);
        })
        .catch((error) => {
          console.error('Error fetching feed:', error);
          commit('SET_LOADING', false);
        });
    },
  },
  getters: {
    getUserFeed: (state) => state.userFeed,
    isLoading: (state) => state.loading,
  },
});

export default store;
