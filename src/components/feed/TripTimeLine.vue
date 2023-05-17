<template>
  <v-timeline side="end" align="start">
    <template v-for="day in days" :key="day">
      <v-timeline-item dot-color="pink" size="small">
        <template v-slot:opposite>
          <div class="pt-1 headline font-weight-bold" v-text="`Day ${day}`"></div>
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
  data: () => ({
    days: [1, 2, 3],
    tripPlaces: [
      [
        {
          id: 2,
          placeId: 123,
          placeName: "광한루",
          tripRouteId: 18,
          tripOrder: 1,
        },
        {
          id: 3,
          placeId: 123,
          placeName: "서울숲",
          tripRouteId: 18,
          tripOrder: 1,
        },
      ],
      [
        {
          id: 9,
          placeId: 123,
          placeName: "광한루",
          tripRouteId: 18,
          tripOrder: 2,
        },
      ],
      [
        {
          id: 9,
          placeId: 123,
          placeName: "제주도 핫플",
          tripRouteId: 18,
          tripOrder: 2,
        },
      ],
    ],
  }),
};
</script>
