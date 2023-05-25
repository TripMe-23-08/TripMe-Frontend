<template>
  <div id="map"></div>

  <!--Place Dialog START-->
  <v-dialog v-model="dialog" width="40%">
    <v-card style="border-radius: 3%">
      <!-- <div v-html="makeCard(dialogData)"></div> -->

      <place-detail-info :dialogData="dialogData" />

      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!--Place Dialog END-->
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";
import PlaceDetailInfo from "../map/PlaceDetailInfo.vue";

export default {
  components: { PlaceDetailInfo },
  name: "KakaoMap",
  props: {
    markerPositions: Array,
  },
  computed: {
    ...mapState("authStore", ["isLogin", "userInfo"]),
  },
  data() {
    return {
      map: null,
      markers: [],
      markersMeta: [],
      infowindow: null,
      overlayMap: {},
      dialog: false,

      dialogData: {},
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${"dcf4ead723c5ce726be18993bc5246fc"}`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, options);
      this.displayMarker([{ latitude: 33.450701, longitude: 126.570667 }]);
    },
    categoryMarkerImgMapper(categoryCode) {
      let categoryMap = {
        12: "tm-umbrella-beach", // 관광지
        14: "tm-building-columns", // 문화시설
        15: "tm-champagne-glasses", // 축제/공연/행사
        25: "tm-travel-course", // 여행코스
        28: "tm-person-hiking", // 레포츠
        32: "tm-hotel", //숙박
        38: "tm-basket-shopping", // 쇼핑
        39: "tm-utensils", // 음식점
        undefined: "tm-undefined",
      };
      return require(`@/assets/img/marker/${categoryMap[categoryCode]}.svg`);
    },
    createMarkerImage(src) {
      // let options = {
      //   spriteOrigin: new kakao.maps.Point(10, 36),
      //   spriteSize: new kakao.maps.Size(36, 98),
      // };
      let size = new kakao.maps.Size(36, 36);
      var markerImage = new kakao.maps.MarkerImage(src, size);
      return markerImage;
    },
    // show markers based on latlng from markerPositions array
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      this.markers = [];
      this.overlayMap = {};
      this.markersMeta = [];
      const positions = markerPositions.map((markerInfo) => {
        let point = new kakao.maps.LatLng(markerInfo.latitude, markerInfo.longitude);
        let src = this.categoryMarkerImgMapper(markerInfo.category);
        var marker = new kakao.maps.Marker({
          map: this.map,
          position: point,
          image: this.createMarkerImage(src),
        });

        this.markers.push(marker);
        this.markersMeta.push(markerInfo);

        return point;
      });
      if (positions.length > 0) {
        if (this.markers.length === 1) {
          this.map.panTo(this.markers[0].getPosition());

          // case 2: multiple pins
        } else {
          // set bound of the map overview
          const bounds = positions.reduce(
            (bounds, latlng) => bounds.extend(latlng),
            new kakao.maps.LatLngBounds()
          );
          this.map.setBounds(bounds);
        }
        // set marker events
        this.setMarkerEvents();
      }
    },

    // mouse over (in & out) event
    setMarkerEvents() {
      // this.setMarkersMouseInEvent();
      // this.setMarkersMouseOutEvent();
      //this.setMarkersMouseClickEvent();
      this.setMouseClickEvent();
    },
    setMouseClickEvent() {
      //[동일한지 확인]console.log(this.map);
      for (let i = 0; i < this.markers.length; i++) {
        let marker = this.markers[i];
        let meta = this.markersMeta[i];

        kakao.maps.event.addListener(marker, "click", () => {
          //[동일한지 확인]console.log(this.map);

          this.dialog = true;
          this.dialogData = meta;
          // update history log
          if (this.isLogin) {
            http.post("/places/history", {
              params: {
                userId: this.userInfo.id,
                placeId: meta.id,
              },
            });
          }
        });
      }
    },
    // makeCard(data) {
    //   let categoryMapper = (categoryCode) => {
    //     let categoryMap = {
    //       12: "fa-solid fa-umbrella-beach", // 관광지
    //       14: "fa-solid fa-building-columns", // 문화시설
    //       15: "fa-solid fa-champagne-glasses", // 축제/공연/행사
    //       25: "fa-solid fa-map-location-dot", // 여행코스
    //       28: "fa-solid fa-person-hiking", // 레포츠
    //       32: "fa-solid fa-hotel", //숙박
    //       38: "fa-solid fa-basket-shopping", // 쇼핑
    //       39: "fa-solid fa-utensils", // 음식점
    //     };
    //     console.log(categoryMap[categoryCode]);
    //     return categoryMap[categoryCode];
    //   };
    //   var img = data.imgUrl
    //     ? data.imgUrl
    //     : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png";
    //   var name = data.name ? data.name : "상호명 정보 없음";
    //   var address = data.address ? data.address : "주소 정보 없음";
    //   var overview = data.overview;
    //   var category = data.category;

    //   let content = `<div class="overlay_info">
    //     <a href="https://map.kakao.com/link/map/${data.latitude},${
    //     data.longitude
    //   }" target="_blank">
    //       <i class="${categoryMapper(category)}" ></i>
    //       <strong>${name}</strong></a>
    //     <div class="desc">
    //       <img src=${img} alt="" >
    //       <div class="address">${address}</div>
    //       <div>${overview}</div>
    //     </div>
    //     </div>`;

    //   return content;
    // },
    // setMarkersMouseClickEvent() {
    //   //[동일한지 확인]console.log(this.map);
    //   for (let i = 0; i < this.markers.length; i++) {
    //     let marker = this.markers[i];
    //     let meta = this.markersMeta[i];
    //     kakao.maps.event.addListener(marker, "click", () => {
    //       //[동일한지 확인]console.log(this.map);
    //       let iwContent = makeCard(meta),
    //         iwPosition = marker.getPosition(),
    //         iwRemoveable = true;

    //       marker.infowindow = new kakao.maps.CustomOverlay({
    //         map: this.map, // 인포윈도우가 표시될 지도
    //         position: iwPosition,
    //         content: iwContent,
    //         removable: iwRemoveable,
    //       });

    //       // update history log
    //       if (this.isLogin) {
    //         http.post("/places/history", {
    //           params: {
    //             userId: this.userInfo.id,
    //             placeId: meta.id,
    //           },
    //         });
    //       }
    //     });
    //   }

    //   function makeCard(data) {
    //     console.log(data);
    //     var img = data.imgUrl
    //       ? data.imgUrl
    //       : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png";
    //     var name = data.name ? data.name : "상호명 정보 없음";
    //     var address = data.address ? data.address : "주소 정보 없음";

    //     let content = `<div class="overlay_info">
    //     <a href="https://map.kakao.com/link/map/${data.latitude},${data.longitude}" target="_blank">
    //       <strong style="background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_icon.png)
    // no-repeat;">${name}</strong></a>
    //     <div class="desc">
    //       <img src=${img} alt="" >
    //       <span class="address">${address}</span>
    //     </div>
    //     </div>`;

    //     return content;
    //   }
    // },

    // setMarkersMouseInEvent() {
    //   //[동일한지 확인]console.log(this.map);
    //   for (let i = 0; i < this.markers.length; i++) {
    //     let marker = this.markers[i];
    //     let meta = this.markersMeta[i];
    //     kakao.maps.event.addListener(marker, "mouseover", () => {
    //       //[동일한지 확인]console.log(this.map);
    //       let iwContent = makeCard(meta),
    //         iwPosition = marker.getPosition(),
    //         iwRemoveable = true;

    //       marker.infowindow = new kakao.maps.CustomOverlay({
    //         map: this.map, // 인포윈도우가 표시될 지도
    //         position: iwPosition,
    //         content: iwContent,
    //         removable: iwRemoveable,
    //       });
    //     });
    //   }
    //   function makeCard(data) {
    //     console.log(data);
    //     var img = data.imgUrl
    //       ? data.imgUrl
    //       : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png";
    //     var name = data.name ? data.name : "상호명 정보 없음";
    //     var address = data.address ? data.address : "주소 정보 없음";

    //     let content = `<div class="overlay_info">
    //     <a href="https://map.kakao.com/link/map/${data.latitude},${data.longitude}" target="_blank"><strong>${name}</strong></a>
    //     <div class="desc">
    //       <img src=${img} alt="" >
    //       <span class="address">${address}</span>
    //     </div>
    //     </div>`;

    //     return content;
    //   }
    // },

    // setMarkersMouseOutEvent() {
    //   for (let i = 0; i < this.markers.length; i++) {
    //     let marker = this.markers[i];
    //     kakao.maps.event.addListener(marker, "mouseout", () => {
    //       //[동일한지 확인]console.log(this.map);
    //       marker.infowindow.setMap(null);
    //     });
    //   }
    // },
  },
  watch: {
    // markerPositions is modified if search clicked from its parents
    markerPositions(newPositions) {
      // show result if the data exists
      if (newPositions.length > 0) {
        console.log("marker position set with : ");
        console.log(newPositions);
        this.displayMarker(newPositions);
      }
    },
  },
  updated() {
    // cutting map phenonmina fixed
    //this.map.relayout();
    // console.log("update and relayout");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#map {
  width: 100%;
  height: 100%;
  min-height: 470px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

.overlay_info {
  margin-bottom: 12px;
  float: left;
  position: relative;
}
.overlay_info:nth-of-type(n) {
  border: 0;
}
.overlay_info a {
  display: block;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
  text-decoration: none;
  color: #fff;
  padding: 12px 36px 12px 14px;
  font-size: 14px;
}
.overlay_info a strong {
  padding-left: 27px;
}
.overlay_info .desc {
  padding: 14px;
  position: relative;
  min-width: 190px;
  min-height: 56px;
}
.overlay_info img {
  vertical-align: top;
  height: 56px;
  width: 56px;
}
.overlay_info .address {
  font-size: 16px;
  color: #333;
  position: absolute;
  left: 80px;
  right: 14px;
  top: 13px;
  white-space: initial;
}
/* .overlay_info:after {
  content: "";
  position: absolute;
  margin-left: -11px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png)
    no-repeat 0 bottom;
} */
</style>
