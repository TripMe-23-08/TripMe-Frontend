import http from "@/api/http";
import router from "@/router";
const state = {
  tripRoutes: [],
  feed: {},
};
const getters = {
  showTripRoutes({ tripRoutes }) {
    //console.log("showFeedDetail", tripRoutes);
    let newTripRoutes = [];
    for (let i = 0; i < tripRoutes.length; i++) {
      // 각각의 tripRoute에 대해
      let days = 1; // 날짜 구하기
      let places = tripRoutes[i].tripPlaces;
      let placesPerDay = []; //{day:1, places:[]}
      for (let j = 0; j < places.length; j++) {
        // 각각의 tripPlace에 대해
        days = Math.max(days, places[j].tripDay);
      }
      for (let d = 1; d <= days; d++) {
        placesPerDay.push({ day: d, places: [] });
      }
      for (let j = 0; j < places.length; j++) {
        placesPerDay[places[j].tripDay - 1].places.push({
          tripOrder: places[j].tripOrder,
          place: places[j].place,
        });
      }
      for (let j = 0; j < places.length; j++) {
        placesPerDay[places[j].tripDay - 1].places.sort((x) => x.tripOrder);
      }
      newTripRoutes.push({ ...tripRoutes[i], tripPlaces: placesPerDay });
    }
    return newTripRoutes;
  },
  showFeed({ feed }) {
    let days = 1; // 날짜 구하기
    let places = feed.tripRoute.tripPlaces;
    let placesPerDay = []; //{day:1, places:[]}
    for (let j = 0; j < places.length; j++) {
      // 각각의 tripPlace에 대해
      days = Math.max(days, places[j].tripDay);
    }
    for (let d = 1; d <= days; d++) {
      placesPerDay.push({ day: d, places: [] });
    }
    for (let j = 0; j < places.length; j++) {
      placesPerDay[places[j].tripDay - 1].places.push({
        tripOrder: places[j].tripOrder,
        place: places[j].place,
      });
    }
    for (let j = 0; j < places.length; j++) {
      placesPerDay[places[j].tripDay - 1].places.sort((x) => x.tripOrder);
    }
    let newFeed = { ...feed };
    newFeed.tripRoute = { ...feed.tripRoute, tripPlaces: placesPerDay };
    console.log(newFeed);
    return newFeed;
  },
};
const mutations = {
  SET_TRIPROUTE_LIST(state, tripRoutes) {
    // for (let i = 0; i < tripRoutes.length; i++) {
    //   // 각각의 tripRoute에 대해
    //   let days = 1; // 날짜 구하기
    //   let places = tripRoutes[i].tripPlaces;
    //   let placesPerDay = []; //{day:1, places:[]}
    //   for (let j = 0; j < places.length; j++) {
    //     // 각각의 tripPlace에 대해
    //     days = Math.max(days, places[j].tripDay);
    //   }
    //   for (let d = 1; d <= days; d++) {
    //     placesPerDay.push({ day: d, places: [] });
    //   }
    //   for (let j = 0; j < places.length; j++) {
    //     placesPerDay[places[j].tripDay - 1].places.push({
    //       tripOrder: places[j].tripOrder,
    //       place: places[j].place,
    //     });
    //   }
    //   for (let j = 0; j < places.length; j++) {
    //     placesPerDay[places[j].tripDay - 1].places.sort((x) => x.tripOrder);
    //   }
    //   tripRoutes[i] = { ...tripRoutes[i], tripPlaces: placesPerDay };
    // }
    // console.log("SET_TRIPROUTE_LIST", tripRoutes);
    state.tripRoutes = tripRoutes;
  },
  SET_FEED_DETAIL(state, feed) {
    //console.log("SET_FEED_DETAIL", feed);
    // let days = 1; // 날짜 구하기
    // let places = feed.tripRoute.tripPlaces;
    // let placesPerDay = []; //{day:1, places:[]}
    // for (let j = 0; j < places.length; j++) {
    //   // 각각의 tripPlace에 대해
    //   days = Math.max(days, places[j].tripDay);
    // }
    // for (let d = 1; d <= days; d++) {
    //   placesPerDay.push({ day: d, places: [] });
    // }
    // for (let j = 0; j < places.length; j++) {
    //   placesPerDay[places[j].tripDay - 1].places.push({
    //     tripOrder: places[j].tripOrder,
    //     place: places[j].place,
    //   });
    // }
    // for (let j = 0; j < places.length; j++) {
    //   placesPerDay[places[j].tripDay - 1].places.sort((x) => x.tripOrder);
    // }
    // feed.tripRoute = { ...feed.tripRoute, tripPlaces: placesPerDay };
    state.feed = feed;
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
  getUserTripRoutes({ commit }, userID) {
    //http요청보내기
    console.log("get routes : " + `/trip-routes/user/${userID}`);
    http
      .get(`/trip-routes/user/${userID}`)
      .then(({ data }) => {
        commit("SET_TRIPROUTE_LIST", data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getFeedDetail({ commit }, feedId) {
    //console.log("getFeedDetail:\t" + "");
    http
      .get(`/articles/${feedId}`)
      .then(({ data }) => {
        commit("SET_FEED_DETAIL", data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateFeedDetail({ state }) {
    //console.log(state.feed);
    http
      .put(`/articles/${state.feed.id}`, state.feed)
      .then(({ data }) => {
        console.log(data);
        router.replace({ path: `/feed` });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteFeed({ state }) {
    http
      .delete(`/articles/${state.feed.id}`)
      .then(({ data }) => {
        console.log(data);
        router.go(0);
      })
      .catch((error) => {
        console.log(error);
      });
    router.replace({ path: "/feed" });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
