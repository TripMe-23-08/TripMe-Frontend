<template>
  <div class="text-center">
      <v-dialog
        v-model="this.dialog"
        width="auto"
      >

        <v-card>
          <v-card-text>
            검색 결과가 없습니다!
          </v-card-text>
          <v-card-actions>
            <v-btn color="#a2d2ff" block @click="this.dialog = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

  <div class="d-flex mt-10 mb-10 justify-space-evenly btn">
    <v-select
      class="ms-2"
      flat="true"
      :items="Object.keys(sidoMap)"
      :model-value="currentSido"
      @update:model-value="currentSido = $event" 
      label="시/도"
      density="compact"
      variant="underlined"
    ><template  v-slot:item="{ item , props}">
        <v-list-item v-bind="props" :title="item.title" class="btn">
        </v-list-item>
      </template></v-select>
    <v-select
      class="ms-2"
      flat="true"
      :items="gugunNameList"
      :model-value="currentGugun"
      @update:model-value="currentGugun = $event"
      label="구/군"
      density="compact"
      variant="underlined"
    ><template v-slot:item="{ item,props }">
        <v-list-item v-bind="props" :title="item.title" class="btn">
        </v-list-item>
      </template>
        </v-select>
    <v-select
      class="ms-2"
      :items="Object.keys(categoryMap)"
      :model-value="currentCategory"
      @update:model-value="currentCategory = $event"
      label="카테고리"
      density="compact"
      variant="underlined"
    ><template v-slot:item="{ item,props }">
        <v-list-item v-bind="props" :title="item.title" class="btn">
        </v-list-item>
      </template></v-select>
    <v-btn class="ml-2" variant="outlined" density="default" @click="search"
      >검색</v-btn
    >
  </div>
  <!--카카오 지도 추가-->
  <!-- map size should be determined by its parent component -->
  <kakao-map
    class="mb-10"
    style="width: 100%; height: 550px"
    :markerPositions="markerPositions"
  />
</template>

<script>
import KakaoMap from "@/components/map/KakaoMap.vue";
import http from "@/api/http";


export default {
  components: { KakaoMap },
  name: "SearchPlaceView",
  data: () => ({
    dialog: false,
    markerPositions: [],
    // category mapping => name: code
    categoryMap: {
      관광지: 12,
      문화시설: 14,
      "축제/공연/행사": 15,
      여행코스: 25,
      레포츠: 28,
      숙박: 32,
      쇼핑: 38,
      음식점: 39,
    },

    // sido mapping => name: code
    sidoMap: {
      서울: 1,
      인천: 2,
      대전: 3,
      대구: 4,
      광주: 5,
      부산: 6,
      울산: 7,
      세종특별자치시: 8,
      경기도: 31,
      강원도: 32,
      충청북도: 33,
      충청남도: 34,
      경상북도: 35,
      경상남도: 36,
      전라북도: 37,
      전라남도: 38,
      제주도: 39,
    },
    areaInfo: {}, // total area info from the server
    currentSido: "", // current sido name mapped to v-select
    currentGugun: "", // current gugun name mapped to v-select
    currentCategory: "", // current category name mapped to v-select
  }),
  created() {
    // get area info from the server when created
    this.setAreaInfo();
  },
  methods: {
    // search button clicked
    search() {
      http
        .get("/places", {
          params: {
            sido: this.sidoMap[this.currentSido],
            gugun: this.currentGugunCode,
            category: this.categoryMap[this.currentCategory],
          },
        })
        .then(({ data }) => {
          console.log(data["data"]);
          this.markerPositions = [];
          this.markerPositions = data["data"];
        })
        .then(() => {
          if (this.markerPositions.length === 0) {
            this.dialog = true;
          }
        });
    },

    // method that sets area info from the server
    setAreaInfo() {
      http.get("/area-codes").then(({ data }) => {
        this.areaInfo = data["data"];
      });
    },
  },
  computed: {
    // compute gugun list to show off when sido is modified (selected)
    gugunNameList() {
      for (let key in this.areaInfo) {
        let check = this.areaInfo[key];
        if (check["sidoName"] === this.currentSido) {
          return check["relatedGugun"].map((data) => data["gugunName"]);
        }
      }
      return [];
    },

    // compute gugun code from the area info for http RQ
    currentGugunCode() {
      if (this.currentGugun === "") {
        return "";
      }

      for (let key in this.areaInfo) {
        let check = this.areaInfo[key];
        if (check["sidoName"] === this.currentSido) {
          for (let gugun of check["relatedGugun"]) {
            if (gugun["gugunName"] === this.currentGugun) {
              return gugun["gugunCode"];
            }
          }
        }
      }

      return "";
    },
  },
  watch: {
    // watch current sido to clear the gugun and category
    currentSido() {
      this.currentGugun = "";
      this.currentCategory = "";
    },
  },
};
</script>

<style scoped>
.btn {
  font-family: "LeeSeoyun";
  font-weight: bold;
  font-size: 20px;
}
</style>
