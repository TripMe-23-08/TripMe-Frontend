<template>
  <v-container class="mt-5" style="max-width: 500px">
    <v-card align="center" text="회원가입" variant="outlined">
      <form width="200" class="mx-auto">
        <v-text-field class="ma-5" :counter="10" label="Name"></v-text-field>

        <v-text-field class="ma-5" :counter="7" label="Phone Number"></v-text-field>

        <v-text-field class="ma-5" label="E-mail"></v-text-field>

        <v-btn class="mb-3" type="submit"> submit </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>
<style></style>
