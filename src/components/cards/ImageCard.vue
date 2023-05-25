<template>
  <v-card class="mx-auto ma-8 plan" width="250" height="250">
    <v-img :src="route.tripImgUrl" height="170px" cover> </v-img>

    <v-card-title class="pb-0"> {{ this.route.name }} </v-card-title>

    <v-card-actions>
      <v-card-subtitle class="align-end"> {{ this.route.createdAt.slice(0, 10) }} </v-card-subtitle>

      <v-spacer></v-spacer>

      <v-btn @click="() => {
        this.hitFavorite()
      }" :ripple="false">
        <v-icon v-if="this.route.favorite === 0" icon="fa:far fa-star"></v-icon>
        <v-icon v-else icon="fa:fas fa-star" style="color: #ffef3d"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "ImageCard",
  components: {},
  props: {
    route: Object,
  },
  data() {
    return {
      imgUrl: "@/assets/mountain.jpg",
      title: "나의 여행 일지 123",
      createdAt: "2023.05.17",
      stared: true,
    };
  },
  methods: {
    hitFavorite() {
      this.$emit("hitFavorite", this.route)
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap");

.plan {
  font-family: "LINESeedKR-Bd";
}
</style>
