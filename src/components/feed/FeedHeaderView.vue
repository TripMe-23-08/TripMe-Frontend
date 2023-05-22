<template>
  <div class="d-flex justify-end">
    <v-text-field density="compact" variant="outlined"></v-text-field>
    <v-select
      class="ms-2"
      flat="true"
      :items="sortby"
      density="compact"
      variant="outlined"
    ></v-select>
    <v-btn class="ml-2" variant="outlined" density="default">검색</v-btn>
  </div>
  <feed-list-view />
</template>

<script>
import FeedListView from "../../views/feed/FeedList.vue";
export default {
  components: { FeedListView },
  name: "FeedView",
  data: () => ({
    sortby: ["정확도", "조회수", "좋아요"],
  }),
};
</script>

<style scoped></style>
