<template>
  <v-container class="mt-5" style="max-width: 500px">
    <v-card text="로그인" variant="outlined">
      <form width="200" class="mx-auto">
        <div>{{ error }}</div>
        <v-text-field class="ma-5" v-model="user.email" :counter="10" label="Email"></v-text-field>

        <v-text-field class="ma-5" v-model="user.password" label="Password"></v-text-field>

        <v-btn class="mb-3 mr-5" @click="login"> 로그인 </v-btn>
        <v-btn class="mb-3">
          <router-link to="/join" style="text-decoration-line: none">회원가입</router-link>
        </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import router from "@/router";
import { mapActions, mapState } from "vuex";
export default {
  name: "loginView",
  data() {
    return { user: { email: "", password: "" }, error: "" };
  },
  computed: {
    ...mapState("authStore", ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions("authStore", ["userConfirm", "getUserInfo"]),
    moveJoin() {
      this.$router.push({ name: "joinView" });
    },
    async login() {
      console.log("LoginView login():\t", this.user);
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("accessToken");
      if (this.isLogin) {
        await this.getUserInfo(token);
        router.push({ name: "home" });
      } else {
        alert("아이디와 패스워드를 다시 확인해주세요.");
      }
    },
  },
};
</script>
<style></style>
