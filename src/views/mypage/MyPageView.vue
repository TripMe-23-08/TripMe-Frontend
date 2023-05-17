<template>
  <v-app id="inspire">
    <enjoy-header />
    <v-main>
      <v-container>
        <v-row no-gutters>
          <v-col cols="3" >
            <v-sheet class="pa-2 ma-2" color="#CFD8DC" min-width="200px">
              <v-row justify="center">
                <div class="ma-4">
                  <div class="text-subtitle-2"></div>
                  <v-img
                    class="bg-white "
                    width="150"                    
                    :aspect-ratio="3.5 / 4"
                    :src="require('@/assets/day.jpg')"
                    cover
                  ></v-img>
                </div>
              </v-row>
              <v-row justify="center">
                <v-btn color="#9E9E9E" class="mb-3" width="160px"> 아이디 </v-btn>
              </v-row>
              <v-row justify="center">
                <v-btn @click="moveEdit" color="#9E9E9E" class="mb-5" width="160px">
                  {{ pages.title }}
                </v-btn>
              </v-row>
            </v-sheet>

            <v-row>
              <v-col>
                <v-sheet class="pa-2 ma-2" color="#CFD8DC" min-width="200px">
                  <v-row justify="center">
                    <v-btn color="#9E9E9E" class="mb-3 mt-5" width="160px"> 나의 여행 계획 </v-btn>
                  </v-row>
                  <v-row justify="center">
                    <v-btn color="#9E9E9E" class="mb-3" width="160px"> 내가 쓴 포스트 </v-btn>
                  </v-row>
                  <v-row justify="center">
                    <v-btn color="#9E9E9E" class="mb-3" width="160px"> 조회한 여행지 목록 </v-btn>
                  </v-row>
                  <v-row justify="center">
                    <v-btn color="#9E9E9E" class="mb-5" width="160px"> 조회한 게시글 </v-btn>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-sheet class="pa-2 ma-2" color="#CFD8DC" min-width="600px"> 상단타이틀 </v-sheet>
            <v-row >
              <v-col>
                <v-row class="mb-6" no-gutters>
                  <v-col class="mb-3">
                    <image-card></image-card>
                  </v-col>

                  <v-col class="mb-3">
                    <image-card></image-card>
                  </v-col>

                  <v-col class="mb-3">
                    <image-card></image-card>
                  </v-col>

                  <v-col class="mb-3">
                    <image-card></image-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <enjoy-footer />
  </v-app>
</template>

<script>
import ImageCard from "@/components/cards/ImageCard.vue";

export default {
  name: "mypageView",
  data: () => ({
    pages: { title: "개인 정보 수정", link: "/edit" },
  }),
  components: {
    ImageCard,
  },
  methods: {
    moveEdit() {
      this.$router.push({ name: "mypageEdit" });
    },
  },
};
</script>

<style scoped></style>