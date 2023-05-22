<template>
  <v-container>
    <v-row>
      <!-- top left map area -->
      <v-col>
        <kakao-map />
      </v-col>

      <!-- top right search area-->
      <v-col>
        <!-- text input-->
        <v-card class="mx-auto">
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
        <v-row no-gutters style="overflow-y: scroll ">

          <v-col v-for="n in 9" :key="n" cols="4">
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>

          <!-- <v-col>
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>
          <v-responsive width="100%"></v-responsive>

          <v-col>
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>
          <v-responsive width="100%"></v-responsive>

          <v-col>
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>
          <v-col>
            <simple-image-card @clickPlace="addPlace"></simple-image-card>
          </v-col>
          <v-responsive width="100%"></v-responsive> -->

        </v-row>
      </v-col>
    </v-row>

    <!-- user plan part -->
    <!-- select day-->
    <v-card class="mt-4">
      <v-tabs v-model="tab" bg-color="brown-lighten-5">
        <v-tab v-for="n in length" :key="n" :value="n" @click="selectedDay=n"> Day {{ n }} </v-tab>
        <v-spacer></v-spacer>
        <v-btn :disabled="length === 1" variant="text" @click="removeDay"> 날짜 삭제 </v-btn>
        <v-divider class="mx-1" vertical></v-divider>
        <v-btn variant="text" @click="addDay"> 날짜 추가 </v-btn>
      </v-tabs>

      <!-- daily places -->
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item v-for="n in length" :key="n" :value="n" style="overflow-x: scroll">
            <draggable
              class="d-flex flex-row"
              v-model="allPlaces.places[n-1]"
              group="people"
              @start="drag = true"
              @end="drag = false"
              item-key="id"
              sortable-list
            >

              <template #item="{element, idx}">
                <v-col :key="idx">
                  <text-card v-bind="element" @removePlace="removeSelectedPlace">  </text-card> 
                </v-col>
              </template>

            </draggable>
            
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>

    <!-- temporary space for candidate places -->
    <v-card class="d-flex flex-column mt-4" style="overflow-x: scroll">
      <draggable
        class="d-flex flex-row"
        v-model="allPlaces.candidates"
        group="people"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
        sortable-list
      >

        <template #item="{element, idx}">
          <v-col :key="idx">
            <text-card v-bind="element" @removePlace="removeCandidatePlace" order="1" >  </text-card> 
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
    length: 2,
    tab: null,
    allPlaces: {
      places: [
        [
          {
            name: "경복궁1",
            location: "서울특별시 종로구 사직로 161",
          },
          {
            name: "창덕궁1",
            location: "서울특별시 종로구 율곡로 99",
          },
          {
            name: "덕수궁1",
            location: "서울특별시 중구 세종대로 99",
          },
        ],
        [
          {
            name: "경복궁2",
            location: "서울특별시 종로구 사직로 161",
          },
          {
            name: "창덕궁2",
            location: "서울특별시 종로구 율곡로 99",
          },
          {
            name: "덕수궁2",
            location: "서울특별시 중구 세종대로 99",
          },
        ],
      ],
      candidates: [
        {
          name: "나암산",
          location: "부산광역시 뉴욕주 휴스턴 123"
        },
        {
          name: "경복궁",
          location: "서울특별시 종로구 사직로 161",
        },
        {
          name: "창덕궁",
          location: "서울특별시 종로구 율곡로 99",
        },  
        {
          name: "궁궁궁",
          location: "서울특별시 종로구 율곡로 11",
        },  
      ],
    },
    selectedDay: 1,
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
      this.allPlaces.places.push([])
      this.length++
    },
    
    removeDay(event) {
      console.log(event)
      this.allPlaces.places.pop()
      this.length--
    },

    addPlace(placeData) {
      console.log(placeData)
      // add place text card to the candidate
      // this.allPlaces.places[this.selectedDay-1].push(placeData)

      // check duplicate existance
      let selectedNames = this.allPlaces.places[this.selectedDay-1].map(place => place.name)
      let candidateNames = this.allPlaces.candidates.map(place => place.name) 
      if (selectedNames.includes(placeData.name) || candidateNames.includes(placeData.name)) {
        alert(placeData.name + "\n이미 추가된 장소입니다.")
        return
      }

      // add place to its candidates for flexibility
      this.allPlaces.candidates.push(placeData)
      
    },

    removeSelectedPlace(placeData) {
      this.allPlaces.places[this.selectedDay-1] = this.allPlaces.places[this.selectedDay-1].filter(place => place.name !== placeData.name) 
    },

    removeCandidatePlace(placeData) {
      console.log(placeData)
      // remove place text card from the candidate
      this.allPlaces.candidates = this.allPlaces.candidates.filter(place => place.name !== placeData.name)  
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
