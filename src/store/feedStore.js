import http from "@/api/http";
const state = () => ({
  tripRoutes: [],
});
const getters = {};
const mutations = {
  SET_TRIPROUTE_LIST(state, tripRoutes) {
    console.log("SET_TRIPROUTE_LIST", tripRoutes);
    state.tripRoutes = tripRoutes;
  },
};
const actions = {
  getTripRoutes({ commit }) {
    //http요청보내기
    http
      .get("/trip-routes")
      .then(({ data }) => {
        commit("SET_TRIPROUTE_LIST", data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
