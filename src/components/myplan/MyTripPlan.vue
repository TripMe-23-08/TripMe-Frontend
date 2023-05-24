<template>
  <v-col>
    <v-sheet rounded class="mx-auto pa-2 mt-3 btn text-center" color="#A2D2FF">
      나의 여행 계획
    </v-sheet>
    <v-row class="mb-6">
      <v-col cols="auto" v-for="n in cardItems" :key="`card-${n}`">
        <image-card></image-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import ImageCard from "@/components/cards/ImageCard.vue";

export default {
  name: "myTripPlan",
  components: {
    ImageCard,
  },
  data: () => ({
    cardItems: 5,
  }),
};
</script>

<style scoped>
.btn {
  font-family: "LeeSeoyun";
  font-weight: bold;
  font-size: 25px;
}
</style>
