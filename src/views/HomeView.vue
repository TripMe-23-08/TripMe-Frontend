<template>
  <!--Trip with Enjoy-->
  <v-img
    class="justify-center align-center mt-3 ml-16 mr-16 rounded-lg"
    :src="require('@/assets/pexels-asad-photo-maldives-1268871.jpg')"
    height="550px"
    cover
  >
    <v-row justify="center" align="start">
      <div class="font-weight-bold logo_name loca mb-10"><h1>trip_Me</h1></div>
    </v-row>
    <v-row justify="center" class="loca mb-10">
      <v-btn-group v-if="checkUserInfo() == null">
        <v-btn class="font-weight-bold btn">
          <router-link to="/join" style="text-decoration-line: none">회원가입</router-link></v-btn
        >
        <v-btn class="font-weight-bold btn">
          <router-link to="/login" style="text-decoration-line: none">로그인</router-link></v-btn
        >
      </v-btn-group>
    </v-row>
  </v-img>
  <!--떠나세요-->
  <v-sheet class="bg-grey-lighten-3 ml-16 mr-16 mt-3" min-height="50vh" rounded="lg"> </v-sheet>
  <!--여행 후기-->
  <h3 class="d-flex justify-start mt-10 ml-16 title">여행 후기</h3>
  <div class="d-flex justify-start ml-13 mr-13">
    <trip-feed-back />
  </div>
  <!--추천 여행지-->
</template>

<script>
import TripFeedBack from "@/components/feedback/TripFeedBack.vue";

import { mapState, mapGetters } from "vuex";

export default {
  components: { TripFeedBack },
  computed: {
    ...mapState("authStore", ["userInfo"]),
  },
  methods: {
    ...mapGetters("authStore", ["checkUserInfo"]),
  },
};
</script>

<style scoped>
.logo_name {
  font-family: "Rubik Puddles", cursive;
  font-size: 40px;
  color: #fef9ef;
}

.loca {
  position: relative;
  top: -100px;
}

.btn {
  font-family: "LeeSeoyun";
  font-size: 18px;
  opacity: 0.8;
}

.title {
  font-family: "Do Hyeon", sans-serif;
  font-size: 30px;
}
</style>
