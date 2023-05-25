<template>
  <v-toolbar color="#FEF9EF" height="90">
    <div>
      <img :width="50" :height="60" class="logo ml-10" :src="require('@/assets/logo.png')" />
    </div>
    <div class="logo_name font-weight-bold ml-5 mr-5">trip_Me</div>
    <v-container class="align-center">
      <v-toolbar-items>
        <v-btn
          class="bar font-weight-bold"
          v-for="page in pages"
          :key="page.title"
          :href="page.link"
          variant="text"
          height="50px"
          style="font-size: 23px"
        >
          {{ page.title }}
        </v-btn>
        <v-btn v-if="checkUserInfo() !== null" @click="logout">
          <v-icon icon="fa:fas fa-sharp fa-right-from-bracket" />
        </v-btn>
      </v-toolbar-items>
    </v-container>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EnjoyHeader",
  data: () => ({
    pages: [
      { title: "홈", link: "/" },
      { title: "여행계획", link: "/plan" },
      { title: "피드", link: "/feed" },
      { title: "장소", link: "/place" },
      { title: "마이페이지", link: "/mypage" },
    ],
  }),

  methods: {
    ...mapGetters("authStore", ["checkUserInfo"]),
    ...mapActions("authStore", ["userLogout"]),
    logout() {
      console.log("LOGOUT IN METHOD");
      this.userLogout();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik+Puddles&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Pangolin&display=swap");

.logo_name {
  font-family: "Rubik Puddles", cursive;
  font-size: 43px;
  color: #ff865e;
}

@font-face {
  font-family: "LeeSeoyun";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.bar {
  font-family: "LeeSeoyun", sans-serif;
}
</style>
