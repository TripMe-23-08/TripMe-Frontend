<template>
  <v-row class="mx-auto ma-8">
    <v-col>
      <v-card class="justify-center d-flex mt-2 card" variant="outlined">
        <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg">
          <v-card-title class="review"> 최고의 여행지였습니다. </v-card-title>
          <v-card-text class="review">
            여행지 추천 받아서 갔다왔는데 후회없었어요<br />
          </v-card-text>
          <!--rating -->
          <div class="text-center">
            <v-rating v-model="rating" hover half-increments size="small" readonly></v-rating>
            <pre>{{ rating }}</pre>
          </div>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TripFeedBack",
  data: () => ({}),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap");

@font-face {
  font-family: "LINESeedKR-Bd";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2")
    format("woff2");
  font-weight: 400;
  font-style: normal;
}

.review {
  font-family: "LINESeedKR-Bd";
}
.card {
  background-color: #fef9ef;
}
</style>
