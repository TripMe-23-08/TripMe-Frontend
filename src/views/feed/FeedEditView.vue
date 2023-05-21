<template>
  <v-row no-gutters>
    <v-col md="12">
      <v-sheet class="pa-2 ma-2">
        <v-select
          :items="tripRoute.title"
          variant="outlined"
          density="compact"
        ></v-select>
        <trip-time-line />
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 ma-2">
        <v-row>
          <v-input />
        </v-row>
        <v-row>
          <v-textarea
            variant="outlined"
            auto-grow
            label="내용"
            rows="2"
            row-height="20"
          ></v-textarea>
        </v-row>
        <v-row></v-row>
      </v-sheet>
    </v-col>
  </v-row>
  <!---->
</template>

<script>
import TripTimeLine from "@/components/feed/TripTimeLine.vue";

export default {
  name: "FeedEdit",
  components: { TripTimeLine },
  data: () => ({
    sortby: ["정확도", "조회수", "좋아요"],
    tripRoute: null,
  }),
};
</script>

<style scoped></style>
