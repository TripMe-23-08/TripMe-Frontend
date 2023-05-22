import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import feedStore from "./feedStore";
export default createStore({
  modules: {
    feedStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});