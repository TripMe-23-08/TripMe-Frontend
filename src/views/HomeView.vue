<template>
  <!--Trip with Enjoy-->
  <v-img
    class="d-flex justify-center align-center"
    src="https://picsum.photos/id/10/868/400"
    cover
  >
    <div class="text-cyan-lighten-5"><h1>Enjoy Trip</h1></div>
    <v-btn-group class="ms-3">
      <v-btn>회원가입</v-btn>
      <v-btn>로그인</v-btn>
    </v-btn-group>
  </v-img>
  <!--떠나세요-->
  <v-sheet class="bg-grey-lighten-3" min-height="50vh" rounded="lg"> </v-sheet>
  <!--여행 후기-->
  <trip-feed-back />
  <!--추천 여행지-->
</template>

<script>
import TripFeedBack from "@/components/feedback/TripFeedBack.vue";

// component test

export default {
  components: { TripFeedBack },
};
</script>
