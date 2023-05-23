<template>
  <!--Trip with Enjoy-->
  <v-img
    class="d-flex justify-center align-center"
    src="https://picsum.photos/id/10/868/400"
    cover
  >
    <div class="text-cyan-lighten-5"><h1>Enjoy Trip</h1></div>
    <v-btn-group v-if="checkUserInfo()==null" class="ms-3">
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
  </v-img>
  <!--떠나세요-->
  <v-sheet class="bg-grey-lighten-3" min-height="50vh" rounded="lg"> </v-sheet>
  <!--여행 후기-->
  <trip-feed-back />
  <!--추천 여행지-->
</template>

<script>
import TripFeedBack from "@/components/feedback/TripFeedBack.vue";

import { mapState , mapGetters} from "vuex";

export default {
  components: { TripFeedBack },
  computed: {
    ...mapState("authStore", ["userInfo"]),
  },
  methods: {
    ...mapGetters("authStore",["checkUserInfo"]),

  }
};
</script>
