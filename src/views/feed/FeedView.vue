<template>
  <v-row justify="end">
    <v-col cols="5">
      <v-row>
        <v-text-field density="compact" variant="outlined"></v-text-field>
        <v-select
          class="ms-2"
          flat="true"
          :items="sortby"
          density="compact"
          variant="outlined"
        ></v-select>
        <v-btn class="ml-2" variant="outlined" density="default">검색</v-btn>
      </v-row>
    </v-col>
  </v-row>

  <!---->
  <router-view></router-view>
</template>

<script>
export default {
  name: "FeedView",
  data: () => ({
    sortby: ["정확도", "조회수", "좋아요"],
  }),
};
</script>

<style scoped></style>
