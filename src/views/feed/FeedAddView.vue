<template>
  <v-row class="mt-10 content">
    <v-col>
      <v-sheet>
        <v-select
          hide-no-data="true"
          v-model="selectedRoute"
          label="여행 경로 선택"
          return-object
          :items="showTripRoutes"
          item-title="name"
          item-value="id"
          variant="outlined"
          density="compact"
          class="content"
        >        
        <template v-slot:item="{ item, props }">
        <v-list-item v-bind="props" :title="item.title" class="content"> </v-list-item>
      </template>
        </v-select>
        <trip-time-line
          v-if="selectedRoute != null"
          direction="vertical"
          :tripPlaces="selectedRoute.tripPlaces"
        />
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 ml-10 mt-1">
        <!---이미지 업로드 뷰-->
        <v-row
          id="img-upload"
          class="base-image-input"
          aspect-ratio="1"
          cover
          :style="{ 'background-image': `url(${imgPreview})` }"
          @click="chooseImage"
        >
          <span v-if="!imgPreview" class="placeholder"> 이미지 선택 </span>
          <input class="file-input" ref="fileInput" type="file" @input="onSelectFile" />
        </v-row>

        <!-- Trip Route에 포함된 장소 관련 장소 이미지--->
        <v-row
          id="trip-route-img"
          style="overflow-y: hidden; max-height: 400px"
          v-if="selectedRoute != null"
          class="section"
        >
          <v-col v-for="tripPlace in extractPlaces(selectedRoute)" :key="tripPlace" cols="3">
            <simple-image-card
              :place-info="tripPlace.place"
              @click="
                () => {
                  console.log('img click on feed add view');
                }
              "
            />
          </v-col>
        </v-row>
        <!--제목 내용 뷰--->
        <v-row class="pt-2">
          <v-textarea
            class="mt-3"
            v-model="feed.title"
            variant="outlined"
            label="제목"
            rows="1"
          ></v-textarea>
        </v-row>
        <v-row>
          <v-textarea
            v-model="feed.content"
            variant="outlined"
            label="내용"
            rows="4"
            row-height="40"
          ></v-textarea>
        </v-row>
        <v-row class="d-flex justify-end">
          <v-btn color="#A2D2FF" class="mr-3" variant="outlined" @click="addFeed"> 등록 </v-btn>
          <v-btn color="#FF865E" class="mr-3" variant="outlined" @click="cancle"> 취소 </v-btn>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
  <!---->
</template>

<script>
import TripTimeLine from "@/components/feed/TripTimeLine.vue";
import SimpleImageCard from "@/components/cards/SimpleImageCard.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import router from "@/router";
import http from "@/api/http";
export default {
  name: "feedAdd",
  components: { TripTimeLine, SimpleImageCard },
  data: () => ({
    selectedRoute: null,
    imgPreview: null,

    // Post 등록시, 서버에 넘겨야 하는 정보
    feed: {
      title: "",
      content: "",
      file: [],
    },
  }),

  computed: {
    ...mapState("authStore", ["isLogin", "isLoginError", "userInfo"]),
    ...mapState("feedStore", ["tripRoutes"]),
    ...mapGetters("feedStore", ["showTripRoutes"]),
  },
  created() {
    this.getUserTripRoutes(this.userInfo.id); // [2]
  },
  methods: {
    ...mapActions("feedStore", ["getTripRoutes"]), // [1]

    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgPreview = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    cancle() {
      console.log("CANCLE");
      router.replace({ path: "/feed" });
    },
    addFeed() {
      http.post(
        "/articles",
        {
          title: this.feed.title,
          content: this.feed.content,
          tripRouteId: this.selectedRoute.id,
        },
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJhYUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IuydtOumhOydtOumhCIsInVzZXJJZCI6Mywic3ViIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjg0OTE1MDM4LCJleHAiOjE2ODQ5MTg2Mzh9.mFLlGmd4OlHHvnoPiRDgS6nVPmQhpvYMiZ65IFvEuxE",
          },
        }
      );
      router.replace({ path: "/feed" });
    },

    extractPlaces(selectedRoute) {
      let places = [];
      if (!selectedRoute) return places;

      selectedRoute.tripPlaces.forEach((tripPlace) => {
        places = [...places, ...tripPlace.places];
      });

      return places;
    },
  },
};
</script>

<style scoped>
.base-image-input {
  display: block;
  width: 100%;
  height: 300px;
  margin-bottom: 100px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
#img-upload {
  overflow: auto;
  height: 300px;
}
#trip-route-img {
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;
}
.content {
  font-family: "LeeSeoyun";
  font-size: 20px;
}

.section {
  max-height: 250px;
  padding: 1rem;
  overflow-x: auto;
  direction: ltr;
  scrollbar-color: #fef9ef;
}

.section::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.section::-webkit-scrollbar-track {
  background-color: #fef9ef;
  border-radius: 80px;
}

.section::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-color: #fee440;
}

</style>
