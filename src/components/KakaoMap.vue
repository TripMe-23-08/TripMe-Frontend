<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: "KakaoMap",
  props: {
    markerPositions: Array,
  },
  data() {
    return {
      map: null,
      markers: [],
      meta: [],
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
      console.log("!!!!!!!!!!!!>>>>>>>", markerPositions);
      this.markers = [];
      this.overlayMap = {};

      const positions = markerPositions.map((position) => {
        console.log(position);
        return new kakao.maps.LatLng(position.latitude, position.longitude);
      });
      /// 여기부터>>>>>>>>>>>>>>.
      if (positions.length > 0) {
        for (let i = 0; i < positions.length; i++) {
          var marker = new kakao.maps.Marker({
            map: this.map,
            position: positions[i],
          });
          this.markers.push(marker);
          this.meta.push();
          var content =
            '<div class ="label"><span class="left"></span><span class="center" style="color:red;">카카오!</span><span class="right"></span></div>';
          var overlay = new kakao.maps.CustomOverlay({
            position: positions[i],
            content: content,
          });
          this.overlayMap[marker] = overlay;
        }

        // case 1: single pin
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
      // 여기까지 진행<<<<<<<<<<<<<<
    },

    // mouse over (in & out) event
    setMarkerEvents() {
      //this.setMarkersMouseInEvent();
      //this.setMarkersMouseOutEvent();
      this.setMarkersMouseClickEvent();
    },
    /*
    var overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition()       
});

// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
kakao.maps.event.addListener(marker, 'click', function() {
    overlay.setMap(map);
});

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
function closeOverlay() {
    overlay.setMap(null);     
}
    */
    setMarkersMouseClickEvent() {
      //[동일한지 확인]console.log(this.map);
      this.markers.forEach((marker) => {
        kakao.maps.event.addListener(marker, "click", () => {
          //[동일한지 확인]console.log(this.map);
          let iwContent = makeCard(this.markerPositions),
            iwPosition = marker.getPosition(),
            iwRemoveable = true;

          marker.infowindow = new kakao.maps.InfoWindow({
            map: this.map, // 인포윈도우가 표시될 지도
            position: iwPosition,
            content: iwContent,
            removable: iwRemoveable,
          });
        });
      });

      function makeCard(data) {
        var img = data.imgUrl
          ? data.imgUrl
          : "../../assets/img/infoview_default.png";
        var title = data.title ? data.title : "상호명 정보 없음";
        var addr = data.addr1 ? data.addr1 : "주소 정보 없음";
        var zipcode = data.zipcode ? data.zipcode : "우편번호 정보 없음";
        var tel = data.tel ? data.tel : "";

        var content = `    <div style="max-width: 270px; border-radius: 0; border: none;">
  <div style="align-items: center">
    <div class="row g-0" style="align-items: center">
      <div class="col-4">
        <img src="${img}" class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-8 ps-2">
        <div class="h5 fw-bold mb-0">${title}</div>
        <small>${addr}</small><br />
        <small class="text-black-50">(우) ${zipcode}</small><br />
        <small class="text-black-50">(전화번호) ${tel}</small>
      </div>
    </div>
  </div>
</div>`;
        return content;
      }
    },

    setMarkersMouseInEvent() {
      // var content = '<div class ="label"><span class="left"></span><span class="center" style="color:red;">카카오!</span><span class="right"></span></div>';

      // // 커스텀 오버레이가 표시될 위치입니다
      // var position = new kakao.maps.LatLng(33.450701, 126.570667);

      // // 커스텀 오버레이를 생성합니다
      // var customOverlay = new kakao.maps.CustomOverlay({
      //     position: position,
      //     content: content
      // });

      // // 커스텀 오버레이를 지도에 표시합니다
      // customOverlay.setMap(this.map);

      for (let marker of this.markers) {
        kakao.maps.event.addListener(marker, "mouseover", function () {
          console.log("mouse in with ", marker);
          console.log(marker.getPosition());

          console.log(this.overlayMap);
          // if (marker in this.overlayMap) {
          //   console.log('overlay: ' + this.overlayMap[marker])
          // } else {
          //   console.log('no overlay')
          // }

          // // 임시 커스텀 오버레이
          // let content = '<div class ="label"><span class="left"></span><span class="center" style="color:red;">카카오!</span><span class="right"></span></div>';

          // // 커스텀 오버레이가 표시될 위치입니다
          // let position = new kakao.maps.LatLng(33.450701, 126.570667);

          // // 커스텀 오버레이를 생성합니다
          // let customOverlay = new kakao.maps.CustomOverlay({
          //     position: position,
          //     content: content
          // });

          // // 커스텀 오버레이를 지도에 표시합니다
          // customOverlay.setMap(this.map);
          // this.customOverlay = customOverlay
          // console.log("show info view")

          // iw.setMap(this.map)
          // var content = '<div class ="label"><span class="left"></span><span class="center">카카오!</span><span class="right"></span></div>';
          // this.overlay = new kakao.maps.CustomOverlay({
          //   content: null,
          //   map: this.map,
          //   position: null,
          // });
          // this.overlay.setPosition(marker.getPosition())
          // this.overlay.setContent(content)

          // this.overlay.setMap(this.map);
        });
      }
    },

    setMarkersMouseOutEvent() {
      for (let marker of this.markers) {
        kakao.maps.event.addListener(marker, "mouseout", function () {
          console.log("mouse in with " + marker);
          console.log(marker.getPosition());

          // this.overlay.setMap(null)
          // this.overlay = null
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
      } else {
        alert("검색 결과가 없습니다.");
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
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
