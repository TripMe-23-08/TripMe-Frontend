<template>
  <v-container>
    <!-- title and submit bar -->
    <div class="d-flex justify-space-between mb-6">
      <v-sheet class="flex-fill mr-6">
      <v-text-field
          v-model="tripTitle"
          class="mb-2 flex"
          label="여행 경로 제목"
        ></v-text-field>
      </v-sheet>
      <v-sheet style="width:20%; max-width: 100px;">
        <v-btn
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          저장하기
        </v-btn>
      </v-sheet>
    </div>

    <v-row>
      <!-- top left map area -->
      <v-col style="mx-auto max-height: 400px">
        <kakao-map />
      </v-col>

      <!-- top right search area-->
      <v-col style="overflow-y: scroll" >
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
              v-model="searchKeyword"
              @click:append-inner="searchClick"
              @keydown.enter="searchClick"
            ></v-text-field>
          </v-card-text>
        </v-card>

        <!-- result view-->
        <v-row @scroll="onScroll" v-model="searchResults" no-gutters style="overflow-y: scroll; max-height:400px;">
          
          <!-- watch out in starts from 1, while index 0-->
          <v-col v-for="n in searchResults.length" :key="n" cols="4">
            <simple-image-card :place-info="searchResults[n-1]" @clickPlace="addPlace"></simple-image-card>
          </v-col>

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
import http from "@/api/http";

export default {
  name: "PlanView",
  components: { KakaoMap, TextCard, SimpleImageCard, draggable },
  data: () => ({
    tripTitle: "",
    searchKeyword: "",
    loaded: false,
    loading: false,
    length: 1,
    tab: null,
    searchResults: [],
    allPlaces: {
      places: [[]],
      candidates: [],
    },
    selectedDay: 1,
    drag: false,
    
    // lazy loading
    imageEssential: true,
    imgPerpage: 30,     // load for each page
    page: 0,            // current page
    continueReq: true,  // if false, ignore data request
  }),
  methods: {
    searchClick() {
      // paing
      this.page = 0
      this.continueReq = true

      this.loading = true;
      http
        .get("/places", {
          params: {
            searchKeyword: this.searchKeyword,
            limit: this.imgPerpage,
            image: this.imageEssential,
            // offset: 0
          }
        })
        .then(({data}) => {
          console.log("response of keyword : " + this.searchKeyword)
          console.log(data['data'], data['message'])
          this.searchResults = data['data']
          if (this.searchResults.length == 0) {
            alert("검색 결과가 존재하지 않습니다")
          }
        })
        .then(() => {
          console.log(this.searchResults[this.searchResults.length-1])
          this.loading = false;
          this.loaded = true;
        })
    },
    onScroll({target: {scrollTop, clientHeight, scrollHeight}}) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.reachBottom()
      }
    },

    reachBottom() {
      if (!this.continueReq) return
      // paing
      this.page++
      this.continueReq = true

      this.loading = true;
      http
        .get("/places", {
          params: {
            searchKeyword: this.searchKeyword,
            limit: this.imgPerpage,
            image: this.imageEssential,
            offset: this.imgPerpage * this.page,
          }
        })
        .then(({data}) => {
          if (data['data'].length == 0) {
            this.continueReq = false
            // alert("이젠 더 요청할 것도 없다!")
            return
          }
          this.searchResults = [...this.searchResults, ...data['data']]
        })
        .then(() => {
          // console.log(this.searchResults[this.searchResults.length-1])
          this.loading = false;
          this.loaded = true;
        })
      console.log("reach bottom")
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
      // console.log(placeData)

      // check duplicate existance      
      // namespace to compare with
      let nameToCompare = []

      // check selected spaces
      if (this.allPlaces.places.length > 0) {
        let selectedNames = this.allPlaces.places[this.selectedDay-1].map(place => place.name)
        nameToCompare = [...nameToCompare, ...selectedNames]
      }
      
      // check candidate space
      if (this.allPlaces.candidates.length > 0) {
        let candidateNames = this.allPlaces.candidates.map(place => place.name) 
        nameToCompare = [...nameToCompare, ...candidateNames]
      }

      // check duplicate existance
      if (nameToCompare.includes(placeData.name)) {
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
      this.selectedDay = this.tab = val;
    },
  },
};
</script>

<style scoped></style>
