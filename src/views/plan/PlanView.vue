<template>
  <v-container fluid class="btn">
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

    <!-- title and submit bar -->
    <div class="d-flex justify-center">
      <v-sheet class="flex-fill mr-8">
        <v-text-field
          v-model="tripTitle"
          variant="solo-filled"
          label="여행 경로 제목"
        ></v-text-field>
      </v-sheet>
      <v-sheet style="width: 20%; max-width: 100px">
        <v-btn
          size="x-large"
          variant="outlined"
          block
          color="#A2D2FF"
          type="submit"
          @click="submit"
        >
          저장하기
        </v-btn>
      </v-sheet>
    </div>
    <v-row>
      <!-- top left map area -->
      <v-col style="mx-auto; max-height: 550px;">
        <kakao-map :markerPositions="pinLocation" />
      </v-col>

      <!-- top right search area-->
      <v-col>
        <!-- text input-->
        <v-card class="mx-auto">
          <v-card-text>
            <v-text-field
              :loading="loading"
              density="compact"
              variant="solo"
              label="키워드 검색"
              append-inner-icon="fa:fas fa-magnifying-glass"
              single-line
              hide-details
              v-model="searchKeyword"
              @click:append-inner="searchClick"
              @keydown.enter="searchClick"
            ></v-text-field>
          </v-card-text>
        </v-card>

        <!-- result view-->
        <v-row
          class="noscroll"
          @scroll="onScroll"
          v-model="searchResults"
          no-gutters
          style="overflow-y: scroll; max-height: 400px"
        >
          <!-- watch out in starts from 1, while index 0-->
          <v-col v-for="n in searchResults.length" :key="n" cols="4">
            <simple-image-card
              :place-info="searchResults[n - 1]"
              @clickPlace="addPlace"
              @hoverWaitPlace="hoverWaitPlace"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- user plan part -->
    <!-- select day-->
    <v-card class="mt-4">
      <v-tabs v-model="tab" bg-color="#FEF9EF">
        <v-tab v-for="n in length" :key="n" :value="n" @click="selectedDay = n">
          Day {{ n }}
        </v-tab>
        <v-spacer></v-spacer>
        <v-btn class="ma-1" :disabled="length === 1" variant="text" @click="removeDay">
          날짜 삭제
        </v-btn>
        <v-divider class="mx-1" vertical></v-divider>
        <v-btn class="ma-1" variant="text" @click="addDay"> 날짜 추가 </v-btn>
      </v-tabs>

      <!-- daily places -->
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item
            class="section overflow-x-auto overflow-y-hidden"
            v-for="n in length"
            :key="n"
            :value="n"
            style="height: 180px"
          >
            <draggable
              class="d-flex flex-row"
              v-model="allPlaces.places[n - 1]"
              group="people"
              @start="drag = true"
              @end="drag = false"
              item-key="id"
              sortable-list
              style="height: 180px"
            >
              <template #item="{ element, idx }">
                <v-col :key="idx">
                  <text-card v-bind="element" @removePlace="removeSelectedPlace"> </text-card>
                </v-col>
              </template>
            </draggable>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>

    <!-- temporary space for candidate places -->
    <v-card class="section d-flex flex-column mt-4 overflow-x-auto" style="height: 180px">
      <draggable
        class="d-flex flex-row"
        v-model="allPlaces.candidates"
        group="people"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
        sortable-list
        style="height: 180px"
      >
        <template #item="{ element, idx }">
          <v-col :key="idx">
            <text-card v-bind="element" @removePlace="removeCandidatePlace" order="1"> </text-card>
          </v-col>
        </template>
      </draggable>
    </v-card>
  </v-container>
</template>

<script>
import router from "@/router";
import KakaoMap from "@/components/map/KakaoMap.vue";
import TextCard from "@/components/cards/TextCard.vue";
import SimpleImageCard from "@/components/cards/SimpleImageCard.vue";
import draggable from "vuedraggable";
import http from "@/api/http";
import { mapState } from "vuex";

export default {
  name: "PlanView",
  components: { KakaoMap, TextCard, SimpleImageCard, draggable },
  data: () => ({
    dialog: false,
    tripTitle: "",
    searchKeyword: "",
    loaded: false,
    loading: false,
    length: 1,
    tab: null,
    searchResults: [],
    allPlaces: {
      places: [[]],
      candidates: [],
    },
    selectedDay: 1,
    drag: false,

    // lazy loading
    imageEssential: true,
    imgPerpage: 30, // load for each page
    page: 0, // current page
    continueReq: true, // if false, ignore data request

    // map interaction
    pinLocation: [{ latitude: 36.13790501, longitude: 126.4935202 }],
  }),
  computed: {
    ...mapState("authStore", ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    submit() {
      console.log("submit !!! ");
      // console.log("places : " + this.allPlaces.places)
      // console.log("places ===")
      // for (let i = 0; i < this.allPlaces.places.length; ++i) {
      //   console.log("day " + (i+1) + " : " + this.allPlaces.places[i])
      // }
      // console.log("title : " + this.tripTitle)

      let currentPlaces = [];
      for (let i = 0; i < this.allPlaces.places.length; ++i) {
        let dailyPlaces = this.allPlaces.places[i];
        for (let o = 0; o < dailyPlaces.length; ++o) {
          currentPlaces.push({
            // id set by the server
            placeId: dailyPlaces[o].id,
            imgUrl: dailyPlaces[o].imgUrl,
            // tripRoutId set by the server
            tripDay: i + 1,
            tripOrder: o + 1,
          });
        }
      }
      // let tripImgUrl = this.allPlaces.places[0][0].imgUrl;
      http
        .post("/trip-routes", {
          params: {
            user_id: this.userInfo.id,
            name: this.tripTitle,
            trip_img_url: currentPlaces[0].imgUrl,
            // createdAt set by db
            tripPlaces: currentPlaces,
          },
        })
        .then(({ data }) => {
          console.log(data);
          // alert or forward here
          // currently, just a sample alert
          alert(this.tripTitle + "\n경로 생성 완료!");
          router.push({ name: "home" });
        });
    },
    searchClick() {
      // paing
      this.page = 0;
      this.continueReq = true;

      this.loading = true;
      http
        .get("/places", {
          params: {
            searchKeyword: this.searchKeyword,
            limit: this.imgPerpage,
            image: this.imageEssential,
            // offset: 0
          },
        })
        .then(({ data }) => {
          console.log("response of keyword : " + this.searchKeyword);
          console.log(data["data"], data["message"]);
          this.searchResults = data["data"];
          if (this.searchResults.length == 0) {
            this.dialog = true
          }
        })
        .then(() => {
          console.log(this.searchResults[this.searchResults.length - 1]);
          this.loading = false;
          this.loaded = true;
        });
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.reachBottom();
      }
    },

    reachBottom() {
      if (!this.continueReq) return;
      // paing
      this.page++;
      this.continueReq = true;

      this.loading = true;
      http
        .get("/places", {
          params: {
            searchKeyword: this.searchKeyword,
            limit: this.imgPerpage,
            image: this.imageEssential,
            offset: this.imgPerpage * this.page,
          },
        })
        .then(({ data }) => {
          if (data["data"].length == 0) {
            this.continueReq = false;
            // alert("이젠 더 요청할 것도 없다!")
            return;
          }
          this.searchResults = [...this.searchResults, ...data["data"]];
        })
        .then(() => {
          // console.log(this.searchResults[this.searchResults.length-1])
          this.loading = false;
          this.loaded = true;
        });
      console.log("reach bottom");
    },

    addDay(event) {
      console.log(event);
      this.allPlaces.places.push([]);
      this.length++;
    },

    removeDay(event) {
      console.log(event);
      this.allPlaces.places.pop();
      this.length--;
    },

    addPlace(placeData) {
      // console.log(placeData)

      // check duplicate existance
      // namespace to compare with
      let nameToCompare = [];

      // check selected spaces
      if (this.allPlaces.places.length > 0) {
        let selectedNames = this.allPlaces.places[this.selectedDay - 1].map((place) => place.name);
        nameToCompare = [...nameToCompare, ...selectedNames];
      }

      // check candidate space
      if (this.allPlaces.candidates.length > 0) {
        let candidateNames = this.allPlaces.candidates.map((place) => place.name);
        nameToCompare = [...nameToCompare, ...candidateNames];
      }

      // check duplicate existance
      if (nameToCompare.includes(placeData.name)) {
        alert(placeData.name + "\n이미 추가된 장소입니다.");
        return;
      }

      // add place to its candidates for flexibility
      this.allPlaces.candidates.push(placeData);

      // map interaction
      // add pin and move camera to the place

      this.pinLocation = [{ ...placeData }];
      // console.log("pin loc : ");
      // console.log(this.pinLocation)
    },

    removeSelectedPlace(placeData) {
      this.allPlaces.places[this.selectedDay - 1] = this.allPlaces.places[
        this.selectedDay - 1
      ].filter((place) => place.name !== placeData.name);
    },

    removeCandidatePlace(placeData) {
      console.log(placeData);
      // remove place text card from the candidate
      this.allPlaces.candidates = this.allPlaces.candidates.filter(
        (place) => place.name !== placeData.name
      );
    },

    hoverWaitPlace(placeData) {
      this.pinLocation = [{ ...placeData }];
    },
  },

  watch: {
    length(val) {
      this.selectedDay = this.tab = val;
    },
  },
};
</script>

<style scoped>
.noscroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.btn {
  font-family: "LeeSeoyun";
  font-weight: bold;
  font-size: 20px;
}

.section {
  max-height: 250px;
  padding: 1rem;
  overflow-x: auto;
  direction: ltr;
  scrollbar-color: #fef9ef;
}

.section::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.section::-webkit-scrollbar-track {
  background-color: #fef9ef;
  border-radius: 80px;
}

.section::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-color: #fee440;
}
</style>
