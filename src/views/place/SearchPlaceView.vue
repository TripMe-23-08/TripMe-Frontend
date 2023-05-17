<template>
  <div class="d-flex justify-space-evenly">
    <v-select
      class="ms-2"
      flat="true"
      :items="sidos"
      label="시/도"
      density="compact"
      variant="underlined"
    ></v-select>
    <v-select
      class="ms-2"
      flat="true"
      :items="guguns"
      label="구/군"
      density="compact"
      variant="underlined"
    ></v-select>
    <v-select
      class="ms-2"
      :items="categories"
      label="카테고리"
      density="compact"
      variant="underlined"
    ></v-select>
    <v-btn class="ml-2" variant="outlined" density="default">검색</v-btn>
  </div>
  <!--카카오 지도 추가-->
  <kakao-map />
</template>

<script>
import KakaoMap from "@/components/KakaoMap.vue";

export default {
  components: { KakaoMap },
  name: "SearchPlaceView",
  data: () => ({
    sidos: ["서울", "부산", "대구"],
    guguns: ["종로구", "송파구", "노원구"],
    categories: ["숙박"],
  }),
};
</script>

<style scoped></style>
