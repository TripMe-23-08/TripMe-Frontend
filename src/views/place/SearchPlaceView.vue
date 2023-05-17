<template>
  <div class="d-flex flex-column">
    <v-select :items="items" label="Compact" density="compact"></v-select>
  </div>
</template>

<script>
export default {
  name: "SearchPlaceView",
  data: () => ({
    items: ["a", "b", "c"],
  }),
};
</script>

<style scoped></style>
