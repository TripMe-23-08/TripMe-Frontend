<template>
  <v-toolbar color="#FEF9EF" height="150">
    <div>
      <img :width="70" :height="100" class="logo ml-5 mt-3" :src="require('@/assets/logo.png')" />
    </div>
    <div class="logo_name font-weight-black ml-2">trip_Me</div>
    <v-container class="fill-height d-flex align-center">
      <v-toolbar-items>
        <v-btn v-for="page in pages" :key="page.title" :href="page.link" variant="text">
          {{ page.title }}
        </v-btn>
        <v-btn v-if="checkUserInfo()!==null" @click="logout"  >
          <v-icon icon ="fa:fas fa-sharp fa-right-from-bracket"/>
        </v-btn>

      </v-toolbar-items>
    </v-container>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters} from "vuex";

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
    ...mapGetters("authStore",["checkUserInfo"]),
    ...mapActions("authStore", ["userLogout"]),
    logout() { 
      console.log("LOGOUT IN METHOD");
      this.userLogout();
    }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik+Puddles&display=swap");

.logo_name {
  font-family: "Rubik Puddles", cursive;
  font-size: 50px;
  color: #ff865e;
}
</style>
