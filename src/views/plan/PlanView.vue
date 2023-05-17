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
              label="키워드 검색"
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
        <v-btn :disabled="length === 1" variant="text" @click="removeDay"> 날짜 삭제 </v-btn>
        <v-divider class="mx-1" vertical></v-divider>
        <v-btn variant="text" @click="addDay"> 날짜 추가 </v-btn>
      </v-tabs>

      <!-- daily places -->
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item v-for="n in length" :key="n" :value="n">
            {{ n }}
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>

    <!-- temporary space for candidate places -->
    <v-card class="mt-10 d-flex flex-column align-center justify-start">
      <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false" item-key="id"> 
        <template #item="{element, index}" > 
          <v-col :key="index" cols="12">
          <text-card> {{ element }} </text-card>
        </v-col>
        </template> 
      </draggable>
    </v-card>

  </v-container>
</template>

<script>
import KakaoMap from "@/components/KakaoMap.vue";
import TextCard from "@/components/cards/TextCard.vue";
import SimpleImageCard from "@/components/cards/SimpleImageCard.vue";
import draggable from 'vuedraggable'

export default {
  name: "PlanView",
  components: { KakaoMap, TextCard, SimpleImageCard, draggable },
  data: () => ({
    loaded: false,
    loading: false,
    length: 1,
    tab: null,
    placeArray: [[]],
    candidateArray: ["aaa", "bbb", "ccc"],
    myArray: ["alex", "yang", "seo", "lee", "park"],
    drag: false,
  }),
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },

    addDay(event) {
      console.log(event)
      this.placeArray.push([])
      this.length++
    },
    
    removeDay(event) {
      console.log(event)
      this.placeArray.pop()
      this.length--
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
