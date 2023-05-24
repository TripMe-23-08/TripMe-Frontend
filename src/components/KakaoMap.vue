<template>
  <div id="map"></div>
</template>

<script>
import http from "@/api/http";
import { mapState } from "vuex";

export default {
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

    // show markers based on latlng from markerPositions array
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      this.markers = [];
      this.overlayMap = {};

      const positions = markerPositions.map((markerInfo) => {
        let point = new kakao.maps.LatLng(
          markerInfo.latitude,
          markerInfo.longitude
        );

        var content =
          '<div class ="label"><span class="left"></span><span class="center" style="color:red;">카카오!</span><span class="right"></span></div>';
        var overlay = new kakao.maps.CustomOverlay({
          position: point,
          content: content,
        });

        var marker = new kakao.maps.Marker({
          map: this.map,
          position: point,
        });

        this.overlayMap[marker] = overlay;

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
      //this.setMarkersMouseInEvent();
      //this.setMarkersMouseOutEvent();
      this.setMarkersMouseClickEvent();
    },

    setMarkersMouseClickEvent() {
      //[동일한지 확인]console.log(this.map);
      for (let i = 0; i < this.markers.length; i++) {
        let marker = this.markers[i];
        let meta = this.markersMeta[i];
        kakao.maps.event.addListener(marker, "click", () => {
          //[동일한지 확인]console.log(this.map);
          let iwContent = makeCard(meta),
            iwPosition = marker.getPosition(),
            iwRemoveable = true;

          marker.infowindow = new kakao.maps.InfoWindow({
            map: this.map, // 인포윈도우가 표시될 지도
            position: iwPosition,
            content: iwContent,
            removable: iwRemoveable,
          });

                // update history log
          if (this.isLogin) {
            http
              .post("/places/history", {
                params: {
                  userId: this.userInfo.id,
                  placeId: meta.id,
                }
            })
          }
        });
      }

      function makeCard(data) {
        // var img = data.imgUrl
        //   ? data.imgUrl
        //   : "../../assets/img/infoview_default.png";
        var name = data.name ? data.name : "상호명 정보 없음";
        var address = data.address ? data.address : "주소 정보 없음";

        var content = `<div style="max-width: 270px; border-radius: 0; border: none;">
        <div class="h5 fw-bold mb-0">${name}</div>
        <small>${address}</small><br />
        </div>`;
        return content;
      }

    },

    setMarkersMouseInEvent() {
      for (let marker of this.markers) {
        kakao.maps.event.addListener(marker, "mouseover", function () {
          console.log("mouse in with ", marker);
          console.log(marker.getPosition());

          console.log(this.overlayMap);
        });
      }
    },

    setMarkersMouseOutEvent() {
      for (let marker of this.markers) {
        kakao.maps.event.addListener(marker, "mouseout", function () {
          console.log("mouse in with " + marker);
          console.log(marker.getPosition());
        });
      }
    },
  },
  watch: {
    // markerPositions is modified if search clicked from its parents
    markerPositions(newPositions) {
      // show result if the data exists
      if (newPositions.length > 0) {
        this.displayMarker(newPositions);
      }
    },
  },
  updated() {
    // cutting map phenonmina fixed
    this.map.relayout();
    console.log("update and relayout");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
