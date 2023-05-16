<template>
  <h3 class="d-flex justify-start mt-3">여행 후기</h3>

  <v-list lines="two">
    <v-card class="mx-auto d-flex justify-center" variant="outlined">
      <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg">
        <template v-slot:title> 최고의 여행지였습니다. </template>
        <template v-slot:subtitle> 여행지 추천 받아서 갔다왔는데 후회없었어요<br /> </template>
        <!--rating -->
        <div class="text-center">
          <v-rating v-model="rating" hover half-increments size="x-small" readonly></v-rating>
          <pre>{{ rating }}</pre>
        </div>
      </v-list-item>
    </v-card>

    <v-card class="mx-auto d-flex justify-center mt-1" variant="outlined">
      <v-list-item append-avatar="https://cdn.vuetifyjs.com/images/lists/2.jpg">
        <template v-slot:title> 최고의 여행지였습니다. </template>
        <template v-slot:subtitle> 여행지 추천 받아서 갔다왔는데 후회없었어요<br /> </template>
        <!--rating -->
        <div class="text-center">
          <v-rating v-model="rating" hover half-increments size="x-small" readonly></v-rating>
          <pre>{{ rating }}</pre>
        </div>
      </v-list-item>
    </v-card>
  </v-list>
</template>

<script>
export default {
  name: "TripFeedBack",
  data: () => ({}),
};
</script>
