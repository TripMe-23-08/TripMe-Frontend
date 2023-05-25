<template>
  <v-container>
    <v-row class="view ">
      <v-col cols="3">
        <v-sheet
          rounded
          class="pa-2 mt-5 w-screen"
          color="#FEF9EF"
          height="450px"
          min-width="200px"
          max-width="300px"
        >
          <v-row justify="center">
            <div class="mt-16 mr-10 ml-10 mb-3">
              <div class="text-subtitle-2"></div>
              <v-img
                class="bg-white"
                width="150"
                :aspect-ratio="4 / 5"
                :src="require('@/assets/day.jpg')"
                cover
              ></v-img>
            </div>
          </v-row>
          <v-row justify="center">
            <v-chip class="mt-11 mr-10 ml-10 id" variant="outlined">
              <i class="fa-solid fa-user" style="color: #000000;"></i>
              {{ this.userInfo.email }}
            </v-chip>
          </v-row>
          <v-row justify="center">
            <v-btn
              @click="moveEdit"
              elevation="0"
              color="#FEE440"
              class="mt-5 mr-10 ml-10 btn w-screen"
              width="160px"
            >
              개인 정보 수정
            </v-btn>
          </v-row>
        </v-sheet>

        <v-row>
          <v-col>
            <v-sheet
              rounded
              class="pa-2 mt-10 h-screen w-screen"
              color="#FEF9EF"
              min-width="200px"
              max-width="300px"
            >
              <v-row justify="center">
                <v-btn
                  elevation="0"
                  color="#FEE440"
                  class="mt-5 btn w-screen"
                  width="160px"
                  @click="
                    () => {
                      this.getUserRoutes();
                      currentTabCompo = 'MyTripPlanVue';
                      this.kind = 'route';
                      this.currentTitle = '나의 여행 계획'
                    }
                  "
                >
                  나의 여행 계획
                </v-btn>
                <v-btn
                  elevation="0"
                  color="#FEE440"
                  class="mt-5 btn w-screen"
                  width="160px"
                  @click="
                    () => {
                      this.getUserPlaces();
                      currentTabCompo = 'KakaoMap';
                      this.kind = 'map';
                      this.currentTitle = '조회한 여행지 목록'
                    }
                  "
                >
                  조회한 여행지 목록
                </v-btn>
                <v-btn
                  elevation="0"
                  color="#FEE440"
                  class="mt-5 btn w-screen"
                  width="160px"
                  @click="
                    () => {
                      currentTabCompo = 'FeedList';
                      this.kind = 'user';
                      this.getUserPlaces();
                      this.currentTitle = '내가 쓴 포스트'
                    }
                  "
                >
                  내가 쓴 포스트
                </v-btn>
                <v-btn
                  elevation="0"
                  color="#FEE440"
                  class="mt-5 btn w-screen"
                  width="160px"
                  @click="
                    () => {
                      currentTabCompo = 'FeedList';
                      this.kind = 'history';
                      this.currentTitle = '최근 초회한 게시글'
                    }
                  "
                >
                  조회한 게시글
                </v-btn>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-col style="height: 300px"> -->
      <v-col>
        <v-sheet rounded class="mx-auto pa-2 mt-3 btn text-center" color="#A2D2FF">
          {{ currentTitle }}
        </v-sheet>
        <component v-bind:is="currentTabCompo" v-bind="currentProperties" :key="this.kind">
        </component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MyPostVue from "@/components/myplan/MyPost.vue";
import MyTripPlanVue from "@/components/myplan/MyTripPlan.vue";
import FeedList from "@/views/feed/FeedList.vue";
import KakaoMap from "@/components/map/KakaoMap.vue";
import { mapState } from "vuex";
import http from "@/api/http";

export default {
  name: "mypageView",

  components: {
    MyPostVue,
    MyTripPlanVue,
    FeedList,
    KakaoMap,
  },
  data() {
    return {
      currentTabCompo: "MyTripPlanVue",
      kind: "",
      placeInfo: [],
      routeInfo: [],
      currentTitle: "마이페이지",
    };
  },  
  methods: {
    moveEdit() {
      this.$router.push({ name: "mypageEdit" });
    },
    getUserPlaces() {
      let userId = this.userInfo.id;
      http.get(`/places/user-history/${userId}`).then(({ data }) => {
        setTimeout(() => (this.placeInfo = data["data"]), 100);

        console.log(this.placeInfo);
      });
    },
    getUserRoutes() {
      let userId = this.userInfo.id;
      http.get(`/trip-routes/user/${userId}`).then(({ data }) => {
        this.routeInfo = data["data"]
        console.log(this.routeInfo);
      });
    },
  },
  computed: {
    ...mapState("authStore", ["isLogin", "isLoginError", "userInfo"]),
    currentProperties() {
      if (!this.isLogin) {
        return {};
      }

      if (this.kind === "user" || this.kind === "history") {
        return { kind: this.kind, userId: this.userInfo.id };
      } else if (this.kind === "map") {
        console.log("map called with");
        console.log(this.placeInfo);
        return { markerPositions: this.placeInfo };
      } else if (this.kind === 'route') {
        console.log("route called")
        console.log(this.routeInfo)
        return { tripRoutes: this.routeInfo}
      }

      return {};
    },
  },
};
</script>

<style scoped>
.id {
  max-width: 200px;
  min-width: 100px;
  height: 40px;
}

.btn {
  font-family: "LeeSeoyun";
  font-weight: bold;
  font-size: 20px;
  height: 50px;
}

.view {
  display: flex;
  flex-direction: row;
}
</style>
