<template>
  <v-row no-gutters>
    <v-col>
      <v-sheet class="pa-2 ma-2">
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
        >
        </v-select>

        <trip-time-line
          v-if="selectedRoute != null"
          direction="vertical"
          :tripPlaces="selectedRoute.tripPlaces"
        />
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 ma-2">
        <!---이미지 업로드 뷰-->
        <v-row
          id="img-upload"
          class="base-image-input"
          :style="{ 'background-image': `url(${imgPreview})` }"
          @click="chooseImage"
        >
          <span v-if="!imgPreview" class="placeholder"> 이미지 선택 </span>
          <input
            class="file-input"
            ref="fileInput"
            type="file"
            @input="onSelectFile"
          />
        </v-row>

        <!-- Trip Route에 포함된 장소 관련 장소 이미지--->
        <v-row id="trip-route-img" v-if="selectedRoute != null">
          <v-col
            v-for="tripPlace in selectedRoute.tripPlaces"
            :key="tripPlace"
            cols="3"
          >
            <simple-image-card
              :place-info="tripPlace.place"
              @click="clickPlaceImg"
            />
          </v-col>
        </v-row>

        <!--제목 내용 뷰--->
        <v-row class="pt-2">
          <v-textarea
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
          <v-btn variant="outlined" @click="addFeed"> 등록 </v-btn>
          <v-btn variant="outlined" @click="cancle"> 취소 </v-btn>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
  <!---->
</template>

<script>
import TripTimeLine from "@/components/feed/TripTimeLine.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import router from "@/router";
import http from "@/api/http";
export default {
  name: "feedAdd",
  components: { TripTimeLine },
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
    ...mapState("feedStore", ["tripRoutes"]),
    ...mapGetters("feedStore", ["showTripRoutes"]),
  },
  created() {
    this.getTripRoutes(); // [2]
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
              "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJhYUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IuydtOumhOydtOumhCIsInVzZXJJZCI6Mywic3ViIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjg0ODE1NjQ0LCJleHAiOjE2ODQ4MTkyNDR9.n5WhHmyz6oWlRRStcSrsPWzirL8P4WCPBFQBceS7JEc",
          },
        }
      );
      router.replace({ path: "/feed" });
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
</style>