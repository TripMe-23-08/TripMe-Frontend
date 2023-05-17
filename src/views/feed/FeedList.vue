<template>
  <v-row>
    <v-col v-for="n in lists" :key="n">
      <simple-image-card />
    </v-col>
  </v-row>
</template>

<script>
import SimpleImageCard from "@/components/cards/SimpleImageCard.vue";
export default {
  components: { SimpleImageCard },
  data: () => ({
    lists: [1, 2, 3, 4, 5, 6, 7, 8],
  }),
};
</script>

<style>
</style>