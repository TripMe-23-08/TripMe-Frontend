<template>
  <v-container class="mt-5" style="max-width: 500px">
    <v-card align="center" text="로그인" variant="outlined">
      <form width="200" class="mx-auto">
        <div>{{ error }}</div>
        <v-text-field
          class="ma-5"
          v-model="email"
          :counter="10"
          label="Email"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          v-model="password"
          label="Password"
        ></v-text-field>

        <v-btn class="mb-3 mr-5" @click="login"> 로그인 </v-btn>
        <v-btn class="mb-3">
          <router-link to="/join" style="text-decoration-line: none"
            >회원가입</router-link
          >
        </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import http from "@/api/http";
export default {
  name: "loginView",
  data() {
    return { email: "", password: "", error: "" };
  },
  methods: {
    moveJoin() {
      this.$router.push({ name: "joinView" });
    },
    async login() {
      //TODO: Login Valid Check
      console.log(this.email + " " + this.password);
      try {
        const result = await http.post("/login", {
          email: this.email,
          password: this.password,
        });
        if (result.status == 200) {
          let tokens = result.data.data;
          console.log(tokens);

          this.$router.push({ name: "home" });
        }
      } catch (error) {
        console.log(error.response.data.message);
        this.error = error.response.data.message;
      }
    },
  },
};
</script>
<style></style>
