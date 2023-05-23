<template>
  <v-row>
    <v-col>
      <v-sheet rounded class="pa-2 mt-16 mb-3" color="#A2D2FF" min-width="600px">
        내가 쓴 포스트
      </v-sheet>
      <v-row class="mb-6" justify="space-evenly">
        <v-col cols="auto" class="mb-3" v-for="n in cardItems" :key="`card-${n}`">
          <trip-feed-back-vue />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import TripFeedBackVue from "../feedback/TripFeedBack.vue";

export default {
  name: "myPostView",
  components: {
    TripFeedBackVue,
  },
  data: () => ({
    cardItems: 5,
  }),
};
</script>

<style scoped></style>
