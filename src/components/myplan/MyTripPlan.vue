<template>
  <v-row>
    <v-col>
      <v-sheet rounded class="pa-2 mt-2 mb-3" color="#CFD8DC" min-width="600px">
        나의 여행 계획
      </v-sheet>
      <v-row class="mb-6" justify="space-evenly">
        <v-col cols="auto" class="mb-3" v-for="n in cardItems" :key="`card-${n}`">
          <image-card></image-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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

<style scoped></style>
