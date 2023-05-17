<template>
  <v-card class="mx-auto" width="250" height="250">
    <v-img :src="require('@/assets/mountain.jpg')" height="170px" cover> </v-img>

    <v-card-title class="pb-0"> {{ title }} </v-card-title>

    <v-card-actions>
      <v-card-subtitle class="align-end"> {{ createdAt }} </v-card-subtitle>

      <v-spacer></v-spacer>

      <v-btn @click="stared = !stared" :ripple="false">
        <v-icon v-if="stared" icon="fa:far fa-star"></v-icon>
        <v-icon v-else icon="fa:fas fa-star" style="color: #ffef3d"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ImageCard",
  components: {},

  data() {
    return {
      imgUrl: "@/assets/mountain.jpg",
      title: "나의 여행 일지 123",
      createdAt: "2023.05.17",
      stared: true,
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
