<template>
  <!-- <v-app-bar rounded="">
    <v-container class="fill-height d-flex align-center">
      <v-btn v-for="link in links" :key="link" variant="text">
        {{ link }}
      </v-btn>
    </v-container>
  </v-app-bar> -->
  <v-toolbar color="indigo">
    <v-toolbar-title class="white--text">
      <div>
        <img class="logo" src="https://vuetifyjs.com/apple-touch-icon-180x180.png" />
      </div>
    </v-toolbar-title>
    <v-container class="fill-height d-flex align-center">
      <v-toolbar-items>
        <v-btn v-for="page in pages" :key="page.title" :href="page.link" variant="text">
          {{ page.title }}
        </v-btn>
      </v-toolbar-items>
    </v-container>
  </v-toolbar>
</template>

<script>
export default {
  name: "EnjoyHeader",
  data: () => ({
    pages: [
      { title: "홈", link: "/" },
      { title: "여행계획", link: "/route" },
      { title: "소통", link: "/posts" },
      { title: "마이페이지", link: "/my-page" },
    ],
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
