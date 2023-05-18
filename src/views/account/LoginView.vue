<template>
  <v-container class="mt-5" style="max-width: 500px">
    <v-card align="center" text="로그인" variant="outlined">
      <form width="200" class="mx-auto">
        <v-text-field class="ma-5" :counter="10" label="Id"></v-text-field>

        <v-text-field class="ma-5" label="Password"></v-text-field>

        <v-btn class="mb-3 mr-5" @click="moveMain"> 로그인 </v-btn>
        <v-btn class="mb-3" @click="moveJoin"> 회원가입 </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "loginView",
  methods: {
    moveJoin() {
      this.$router.push({ name: "joinView" });
    },
    moveMain() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>
<style></style>
