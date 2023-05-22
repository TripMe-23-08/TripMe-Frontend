import http from "@/api/http";
const state = () => ({
  tripRoutes: [],
});
const getters = {};
const mutations = {
  SET_TRIPROUTE_LIST(state, tripRoutes) {
    for (let i = 0; i < tripRoutes.length; i++) { // 각각의 tripRoute에 대해
      let days = 1; // 날짜 구하기
      let places = tripRoutes[i].tripPlaces;
      let placesPerDay = []; //{day:1, places:[]}
      for (let j = 0; j < places.length; j++) {  // 각각의 tripPlace에 대해
        days = Math.max(days, places[j].tripDay);
      }
      for (let d = 1; d <= days; d++) {
        placesPerDay.push({day:d,places:[]});
      }
      for (let j = 0; j < places.length; j++) { 
        placesPerDay[places[j].tripDay - 1].places
          .push({ tripOrder: places[j].tripOrder, place: places[j].place });
      }
      for (let j = 0; j < places.length; j++) { 
        placesPerDay[places[j].tripDay - 1].places.sort(x=> x.tripOrder);
      }
      tripRoutes[i]= { ...tripRoutes[i], tripPlaces: placesPerDay }
    }
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
