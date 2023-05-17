<template>
  <v-container class="mt-5" style="max-width: 500px">
    <v-card align="center" text="로그인" variant="outlined">
      <form width="200" class="mx-auto">
        <v-text-field class="ma-5" :counter="10" label="Id"></v-text-field>

        <v-text-field class="ma-5" label="Password"></v-text-field>

        <v-btn class="mb-3 mr-5" type="submit"> 로그인 </v-btn>
        <v-btn class="mb-3" type="submit"> 회원가입 </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  
};
</script>
<style></style>