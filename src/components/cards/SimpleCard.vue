<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="https://images.pexels.com/photos/1470589/pexels-photo-1470589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      height="200px"
      cover
    ></v-img>

    <v-card-title> {{ name }} </v-card-title>

    <v-card-subtitle> {{ location }} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2" variant="text" @click="scrapePlace"> 스크랩 </v-btn>

      <v-spacer></v-spacer>

      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show">
        <v-icon v-if="show" icon="fa:fas fa-chevron-up" />
        <v-icon v-else icon="fa:fas fa-chevron-down" />
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          신촌(新村)은 서울특별시 서대문구 신촌동과 대현동, 창천동, 마포구 노고산동과 대흥동 일대를
          일컫는 지명이다. 주변에 연세대학교, 이화여자대학교, 서강대학교, 홍익대학교 등 국내의 주요
          대학들이 밀집해 있다. 서울역에서도 멀지 않고 고양, 김포, 인천 등지로 연결되는 교통편이
          발달하였으며, 많은 유흥업소 등이 모여 있는 서울의 대표적인 부도심 중 하나이다.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "SimpleCard",
  components: {},
  data() {
    return {
      message: "",
      name: "세상 어딘가에 존재하는 관광지 1",
      location: "서울 서대문구 신촌로 109 (12345)",
      show: false,
    };
  },
  created() {},
  methods: {
    scrapePlace() {
      console.log("scrape clicked !!");
    },
  },
};
</script>

<style scoped></style>
