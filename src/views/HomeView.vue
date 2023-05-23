<template>
  <!--Trip with Enjoy-->
  <v-img
    class="justify-center align-center mt-3 ml-16 mr-16 rounded-lg"
    :src="require('@/assets/pexels-asad-photo-maldives-1268871.jpg')"
    height="550px"
    cover
  >
<<<<<<< HEAD
    <v-row justify="center" align="start">
      <div class="font-weight-bold logo_name loca mb-10"><h1>trip_Me</h1></div>
    </v-row>
    <v-row justify="center" class="loca mb-10">
      <v-btn-group>
        <v-btn class="font-weight-bold btn">
          <router-link to="/join" style="text-decoration-line: none">회원가입</router-link></v-btn
        >
        <v-btn class="font-weight-bold btn">
          <router-link to="/login" style="text-decoration-line: none">로그인</router-link></v-btn
        >
      </v-btn-group>
    </v-row>
=======
    <div class="text-cyan-lighten-5"><h1>Enjoy Trip</h1></div>
    <v-btn-group v-if="userInfo!=null" class="ms-3">
      <v-btn>
        <router-link to="/join" style="text-decoration-line: none"
          >회원가입</router-link
        ></v-btn
      >

      <v-btn>
        <router-link to="/login" style="text-decoration-line: none"
          >로그인</router-link
        ></v-btn
      >
    </v-btn-group>
>>>>>>> 4b09b6e99b300ff0813538424c4a34ddb9722676
  </v-img>
  <!--떠나세요-->
  <v-sheet class="bg-grey-lighten-3 ml-16 mr-16 mt-3" min-height="50vh" rounded="lg"> </v-sheet>
  <!--여행 후기-->
  <trip-feed-back />
  <!--추천 여행지-->
</template>

<script>
import TripFeedBack from "@/components/feedback/TripFeedBack.vue";

import { mapState } from "vuex";

export default {
  components: { TripFeedBack },
  computed: {
    ...mapState("authStore", ["userInfo"]),
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
</style>
