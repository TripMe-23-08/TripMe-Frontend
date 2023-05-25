<template>
  <v-card width="200" height="130">
    <v-row class="ma-1">
      <v-btn
        class="btn pt-3 pl-1"
        variant="text"
        icon="fa:fas fa-xs fa-x"
        height="10px"
        width="10px"
        @click="removePlace"
      ></v-btn>
    </v-row>
    <v-row justify="center" align="center" class="ma-2">
      <p class="title">
        {{ name }}
      </p>
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
  font-size: 20px;
  color: #000000;
  font-weight: 600;
}

.location {
  font-size: 13px;
  color: #878787;
  font-weight: 600;
}
</style>
