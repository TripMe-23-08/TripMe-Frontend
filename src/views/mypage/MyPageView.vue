<template>
  <v-app id="inspire">
    <enjoy-header />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-sheet
              class="pa-2 ma-2"
              color="#CFD8DC"
              min-width="200px"
              max-width="300px"
            >
              <v-row justify="center">
                <div class="ma-4">
                  <div class="text-subtitle-2"></div>
                  <v-img
                    class="bg-white"
                    width="150"
                    :aspect-ratio="3.5 / 4"
                    :src="require('@/assets/day.jpg')"
                    cover
                  ></v-img>
                </div>
              </v-row>
              <v-row justify="center">
                <v-btn
                  color="#9E9E9E"
                  class="mb-3"
                  width="160px"
                  variant="text"
                >
                  아이디
                </v-btn>
              </v-row>
              <v-row justify="center">
                <v-btn
                  @click="moveEdit"
                  color="#9E9E9E"
                  class="mb-5"
                  width="160px"
                >
                  개인 정보 수정
                </v-btn>
              </v-row>
            </v-sheet>

            <v-row>
              <v-col>
                <v-sheet
                  class="pa-2 ma-2"
                  color="#CFD8DC"
                  min-width="200px"
                  max-width="300px"
                >
                  <v-row justify="center">
                    <v-btn
                      color="#9E9E9E"
                      class="mb-3 mt-5"
                      width="160px"
                      v-for="page in pages"
                      :key="page.title"
                      :active="active"
                    >
                      {{ page.title }}
                    </v-btn>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
          <v-col> <component :is="whichStep"></component> </v-col>
        </v-row>
      </v-container>
    </v-main>
    <enjoy-footer />
  </v-app>
</template>

<script>
import MyPostVue from "@/components/myplan/MyPost.vue";
import MyTripPlanVue from "@/components/myplan/MyTripPlan.vue";

export default {
  name: "mypageView",

  components: {
    MyPostVue,
    MyTripPlanVue,
  },
  data() {
    return {
      active: 0,
      pages: [
        { id: 1, title: "나의 여행 계획" },
        { id: 2, title: "내가 쓴 포스트" },
        { id: 3, title: "조회한 여행지 목록" },
        { id: 4, title: "조회한 게시글" },
      ],
    };
  },
  methods: {
    moveEdit() {
      this.$router.push({ name: "mypageEdit" });
    },
  },
  computed: {
    whichStep() {
      if (this.active.id === 1) return MyTripPlanVue;
      if (this.active.id === 2) return MyPostVue;
      switch (this.active) {
        case 1:
          return MyTripPlanVue;
        case 2:
          return MyPostVue;
        default:
          return MyTripPlanVue;
      }
    },
  },
};
</script>

<style scoped></style>
