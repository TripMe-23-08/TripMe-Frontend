<template>
  <v-card class="mx-auto" width="200" height="130">
    <v-row class="ma-2">
      <v-btn
        class="btn"
        variant="text"
        max-width="3px"
        max-height="3px"
        icon="fa:fas fa-x"
        @click="removePlace"
      ></v-btn>
      <br />
    </v-row>
    <v-row class="ma-2">
      <p class="title">
        {{ name }}
      </p>
    </v-row>
    <v-row class="ma-2">
      <p class="location">{{ address }}</p>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "TextCard",
  components: {},
  props: {
    name: String,
    address: String,
  },
  data() {},
  created() {},
  methods: {
    removePlace() {
      // console.log("remove place called !!");
      this.$emit("removePlace", {
        name: this.name,
        location: this.address,
      });
    },
  },
};
</script>

<style scoped>
.btn {
  justify-content: left;
}

.title {
  margin-left: 8px;
  padding-top: 8px;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.location {
  font-size: 12px;
  color: #878787;
  font-weight: 600;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
