<template>
  <v-card class="mx-auto" width="200" height="110">
    <v-card-title>
      {{ name }}
      <v-btn variant="text" icon="fa:fas fa-x" @click="removePlace"></v-btn>
    </v-card-title>

    <v-card-subtitle> {{ location }} </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "TextCard",
  components: {},
  data() {
    return {
      name: "난지 캠핑장",
      location: "서울특별시 마포구",
      order: 1,
      totalPlaceNum: 4,
    };
  },
  created() {},
  methods: {
    removePlace() {
      console.log("remove place called !!");
    },
  },
};
</script>

<style scoped></style>
