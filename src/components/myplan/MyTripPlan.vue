<template>
  <v-col>
    <v-row class="mb-6">
      <v-col cols="auto" v-for="route in this.tripRoutes" :key="route">
        <image-card :route="route" @hitFavorite="hitFavorite"></image-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import http from "@/api/http";

import ImageCard from "@/components/cards/ImageCard.vue";

export default {
  name: "myTripPlan",
  props: {
    tripRoutes: Array,
  },
  components: {
    ImageCard,
  },
  data: () => ({
    cardItems: 5,
  }),
  methods: {
    hitFavorite(route) {
      http.get(`/trip-routes/favorite/${route.id}`)
      route.favorite = (route.favorite === 1 ? 0 : 1)
    }
  }
};
</script>

<style scoped>
.btn {
  font-family: "LeeSeoyun";
  font-weight: bold;
  font-size: 25px;
}
</style>
