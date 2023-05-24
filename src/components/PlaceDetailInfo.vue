<template>
  <v-img
    :src="
      dialogData.imgUrl
        ? dialogData.imgUrl
        : `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png`
    "
    height="200px"
    cover
  ></v-img>
  <div style="display: flex; align-items: center">
    <v-card-title>
      {{ dialogData.name ? dialogData.name : "상호명 정보 없음" }}
    </v-card-title>
    <div @click="stared = !stared" :ripple="false" variant="text">
      <v-icon v-if="stared" icon="fa:far fa-star"></v-icon>
      <v-icon v-else icon="fa:fas fa-star" style="color: #ffef3d"></v-icon>
    </div>
  </div>
  <v-card-subtitle>
    {{ dialogData.address ? dialogData.address : "주소 정보 없음" }}
  </v-card-subtitle>

  <!-- <i class="this.categoryMapper(dialogData.category)"></i> -->

  <v-card-text> {{ dialogData.overview }} </v-card-text>
</template>

<script>
export default {
  name: "PlaceDetailInfo",
  props: {
    dialogData: Object,
  },
  data() {
    return {
      stared: true,
    };
  },
  created() {},
};
</script>

<style scoped></style>