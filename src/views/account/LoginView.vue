<template>
  <v-container class="mt-5 text-center" style="max-width: 600px">
    <div class="text-center">
      <v-dialog
        v-model="this.dialog"
        width="auto"
      >

        <v-card>
          <v-card-text>
            아이디나 패스워드가 잘못되었습니다!
          </v-card-text>
          <v-card-actions>
            <v-btn color="#a2d2ff" block @click="this.dialog = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-card class="borderwidth" variant="outlined" color="#a2d2ff">
      <v-card-title class="login">LOGIN</v-card-title>
      <form width="200" class="mx-auto content">
        <div>{{ error }}</div>
        <v-text-field
          class="ma-5"
          v-model="user.email"
          variant="outlined"
          label="Email"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          v-model="user.password"
          variant="outlined"
          label="Password"
        ></v-text-field>

        <v-btn class="mb-3 mr-5" variant="tonal" @click="login"> 로그인 </v-btn>
        <v-btn class="mb-3" variant="tonal">
          <router-link to="/join" style="color: #a2d2ff; text-decoration-line: none"
            >회원가입</router-link
          >
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
    return {
      user: { email: "", password: "" },
      error: "", 
      dialog: false,
    };
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
        this.dialog = true
      }
    },
  },
};
</script>
<style scoped>
.content {
  font-family: "LeeSeoyun";
  font-size: 20px;
}
.login {
  margin: 15px;
  padding: 15px;
  font-weight: bold;
  font-family: "Rubik Puddles", cursive;
  font-size: 50px;
  color: skyblue;
}
.borderwidth {
  border-width: 5px;
  border-radius: 50px;
}
</style>
