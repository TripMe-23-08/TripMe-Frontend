<template>
  <v-card class="mx-auto" width="160" height="100">
    <p class="title">
      {{ name }}
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="fa:fas fa-x" @click="removePlace"></v-btn>
    </p>

    <p class="location">{{ location }}</p>
  </v-card>
</template>

<script>
export default {
  name: "TextCard",
  components: {},
  props: {
    name: String,
    location: String,
  },
  data() {},
  created() {},
  methods: {
    removePlace() {
      // console.log("remove place called !!");
      this.$emit("removePlace", {
        name: this.name,
        location: this.location,
      });
    },
  },
};
</script>

<style scoped>
.title {
  margin-left: 8px;
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
