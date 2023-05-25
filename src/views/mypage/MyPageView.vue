<template>
  <v-container>
    <v-row class="view">
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
                :aspect-ratio="3 / 4"
                :src="require('@/assets/day.jpg')"
                cover
              ></v-img>
            </div>
          </v-row>
          <v-row justify="center">
            <v-chip class="mt-11 mr-10 ml-10 id" variant="outlined">
              <i class="fa-solid fa-user" style="color: #000000"></i>
              아이디
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
                  class="mt-16 btn w-screen"
                  width="160px"
                  @click="() => {
                    currentTabCompo = 'MyTripPlanVue'
                    this.kind = ''
                  }"
                >
                  나의 여행 계획
                </v-btn>
                <v-btn
                  elevation="0"
                  color="#FEE440"
                  class="mt-16 btn w-screen"
                  width="160px"
                  @click="currentTabCompo = 'MyTripPlanVue'"
                >
                  조회한 여행지 목록
                </v-btn>
                <v-btn
                  elevation="0"
                  color="#FEE440"
                  class="mt-16 btn w-screen"
                  width="160px"
                  @click="() => {
                    currentTabCompo = 'FeedList'
                    this.kind = 'user'
                  }"
                >
                  내가 쓴 포스트
                </v-btn>
                <v-btn
                  elevation="0"
                  color="#FEE440"
                  class="mt-16 btn w-screen"
                  width="160px"
                  @click="() => {
                    currentTabCompo = 'FeedList'
                    this.kind = 'history'
                  }"
                >
                  조회한 게시글
                </v-btn>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <component v-bind:is="currentTabCompo" v-bind="currentProperties" :key="this.kind"> </component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MyPostVue from "@/components/myplan/MyPost.vue";
import MyTripPlanVue from "@/components/myplan/MyTripPlan.vue";
import FeedList from "@/views/feed/FeedList.vue"
import { mapState } from "vuex";

export default {
  name: "mypageView",

  components: {
    MyPostVue,
    MyTripPlanVue,
    FeedList,
  },
  data() {
    return {
      currentTabCompo: "MyTripPlanVue",
      kind: '',
    };
  },
  methods: {
    moveEdit() {
      this.$router.push({ name: "mypageEdit" });
    },
  },
  computed: {
    ...mapState("authStore",["isLogin","isLoginError","userInfo"]),
    currentProperties() {
      if (this.isLogin) {
        return {kind: this.kind, userId: this.userInfo.id}
      }

      return {}
    }
  }
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
