<template>
  <v-card class="mx-auto" width="160" height="100">
    <p class="title">
      {{ name }}
      <v-btn variant="text" icon="fa:fas fa-x" @click="removePlace"></v-btn>
    </p>

    <p class="location"> {{ location }} </p>
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

<style scoped>
.title {
  padding-top: 8px;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.location {
  font-size: 12px;
  color: #878787;
  font-weight: 600;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}


</style>
