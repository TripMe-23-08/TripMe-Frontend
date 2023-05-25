<template>
  <v-timeline side="end" :direction="direction">
    <template v-for="tripPlace in tripPlaces" :key="tripPlace.day">
      <v-timeline-item
        v-if="tripPlace.places.length >= 1"
        size="small"
        dot-color="#A2D2FF"
        fill-dot
      >
        <template v-slot:opposite>
          <div class="pt-1 headline font-weight-bold" v-text="`Day ${tripPlace.day}`"></div>
        </template>
      </v-timeline-item>

      <v-timeline-item
        :key="places"
        v-for="places in tripPlace.places"
        class="mb-3"
        dot-color="#FEE440"
        icon-color="grey lighten-2"
        size="xs-small"
        fill-dot
      >
        <div class="d-flex flex-column">
          <div class="title">
            {{ places.place.name }}
          </div>
          <div class="">
            {{ places.place.address }}
          </div>
        </div>
      </v-timeline-item>
    </template>
  </v-timeline>
</template>
<script>
export default {
  name: "TripTimeLine",
  props: ["direction", "tripPlaces"],
};
</script>

<style scoped>
.title {
  font-family: "LeeSeoyun";
  font-size: 25px;
  font-weight: bold;
}
</style>
