<template>
  <v-container class="bg-surface-variant">
    <v-row>
      <!-- map -->
      <v-col>
        <kakao-map />
      </v-col>

      <!-- search area-->
      <v-col>
        <!-- text input-->
        <v-card class="mx-auto" color="grey-lighten-3">
          <v-card-text>
            <v-text-field
              :loading="loading"
              density="compact"
              variant="solo"
              label="Search templates"
              append-inner-icon="fa:fas fa-magnifying-glass"
              single-line
              hide-details
              @click:append-inner="onClick"
            ></v-text-field>
          </v-card-text>
        </v-card>

        <!-- result view-->
        <v-row no-gutters>
          <v-col>
            <simple-image-card></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card></simple-image-card>
          </v-col>
          <v-responsive width="100%"></v-responsive>

          <v-col>
            <simple-image-card></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card></simple-image-card>
          </v-col>
          <v-responsive width="100%"></v-responsive>
        </v-row>
      </v-col>
    </v-row>

    <!-- user plan part -->
    <!-- select day-->
    <v-card class="mt-10">
      <v-tabs v-model="tab" bg-color="brown-lighten-5">
        <v-tab v-for="n in length" :key="n" :value="n"> Day {{ n }} </v-tab>
        <v-spacer></v-spacer>
        <v-btn :disabled="!length" variant="text" @click="length--"> 날짜 삭제 </v-btn>
        <v-divider class="mx-1" vertical></v-divider>
        <v-btn variant="text" @click="length++"> 날짜 추가 </v-btn>
      </v-tabs>
    </v-card>

    <!-- daily places -->
    <v-window v-model="tab">
      <v-window-item v-for="i in length" :key="i" :value="'tab-' + i">
        <v-card>
          <v-card-text> this is the text </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import KakaoMap from "@/components/KakaoMap.vue";
import SimpleImageCard from "@/components/cards/SimpleImageCard.vue";

export default {
  name: "PlanView",
  components: { KakaoMap, SimpleImageCard },
  data: () => ({
    loaded: false,
    loading: false,
    length: 1,
    tab: null,
  }),
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
  },

  watch: {
    length(val) {
      this.tab = val - 1;
    },
  },
};
</script>

<style scoped></style>
