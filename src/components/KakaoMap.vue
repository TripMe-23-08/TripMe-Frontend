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
      infowindow: null,
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

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      // this.displayMarker([[33.450701, 126.570667]])
    },

    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      const positions = markerPositions.map((position) => new kakao.maps.LatLng(...position));
      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );
 
        this.map.setBounds(bounds);
      }
    },
  },
  watch: {
    markerPositions(oldPositions, newPositions) {
    //   for (let i=0; i<newPositions.length; ++i) {
    //     var marker = new kakao.maps.Marker( {
    //       position: new kakao.maps.LatLng(newPositions[i][0], newPositions[i][1])
    //     })
    //     marker.setMap(this.map)
    //     this.markers.push(marker)
    //   }
      
    //   let bounds = newPositions.reduce(
    //     (bounds, latlng) => bounds.extend(latlng),
    //     new kakao.maps.LatLngBounds()
    //   );
 
    //   this.map.setBounds(bounds);
    //   console.log("markers num : " + this.markers.length)
    if (newPositions.length > 0) {
      this.displayMarker(newPositions)
    } else {
      alert("검색 결과가 없습니다.")
    }
    
    },
  }
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
