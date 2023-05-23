<template>
  <v-timeline side="end" :direction="direction">
    <template v-for="tripPlace in tripPlaces" :key="tripPlace.day">
      <v-timeline-item
        v-if="tripPlace.places.length >= 1"
        dot-color="pink"
        size="small"
      >
        <template v-slot:opposite>
          <div
            class="pt-1 headline font-weight-bold"
            v-text="`Day ${tripPlace.day}`"
          ></div>
        </template>
      </v-timeline-item>

      <v-timeline-item
        :key="places"
        v-for="places in tripPlace.places"
        class="mb-3"
        color="grey"
        icon-color="grey lighten-2"
        size="x-small"
      >
        <div class="d-flex flex-column">
          <div class="text-bold">
            {{ places.place.name }}
          </div>
          <div class="text-caption">
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