import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import feedStore from "./feedStore";
import authStore from "./authStore";
export default createStore({
  modules: {
    feedStore,
    authStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
