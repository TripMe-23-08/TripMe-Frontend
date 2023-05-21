<template>
  <v-timeline side="end" align="start" :direction="direction">
    <template v-for="day in days" :key="day">
      <v-timeline-item dot-color="pink" size="small">
        <template v-slot:opposite>
          <div
            class="pt-1 headline font-weight-bold"
            v-text="`Day ${day}`"
          ></div>
        </template>
      </v-timeline-item>

      <v-timeline-item
        :key="tripPlace.id"
        v-for="tripPlace in tripPlaces[day - 1]"
        class="mb-3"
        color="grey"
        icon-color="grey lighten-2"
        size="x-small"
      >
        <div class="d-flex">
          <div class="text-caption">
            {{ tripPlace.placeName }}
          </div>
        </div>
      </v-timeline-item>
    </template>
  </v-timeline>
</template>
<script>
export default {
  name: "TripTimeLine",
  props: ["direction", "tripRoute"],
  computed: {
    tripPlaces() {
      console.log(this.tripRoute);
      return this.tripRoute.tripPlaces;
    },
    days() {
      return this.tripRoute;
    },
  },
};
</script>
