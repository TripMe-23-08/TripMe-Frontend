<template>
  <v-row class="mt-10 content">
    <v-col>
      <v-select
        hide-no-data="true"
        v-model="feed.tripRoute"
        label="여행 경로"
        return-object
        item-title="name"
        item-value="id"
        variant="outlined"
        density="compact"
        menu-icon=""
      >
      </v-select>
      <br />
      <v-sheet class="pa-2 ma-2">
        <trip-time-line
          direction="vertical"
          dot-color="purple"
          :tripPlaces="showFeed.tripRoute ? showFeed.tripRoute.tripPlaces : null"
        />
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 ml-10 mt-1">
        <!--이미지 업로드 뷰-->
        <v-row id="img-upload">
          <v-img
            :src="`https://picsum.photos/500/200?image=${1 + 10}`"
            aspect-ratio="1"
            cover
            class="bg-grey-lighten-2"
          >
          </v-img>
        </v-row>

        <!-- Trip Route에 포함된 장소 관련 장소 이미지--->
        <v-row class="section" id="trip-route-img" style="overflow-y: hidden; max-height: 400px">
          <v-col v-for="tripPlace in feed.tripRoute.tripPlaces" :key="tripPlace" cols="3">
            <simple-image-card :place-info="tripPlace.place" @click="clickPlaceImg" />

            <!--TODO : Dialog 추가-->
            <!-- <image-text-dialog :clickedPlaceInfo="tripPlace.place" /> -->
          </v-col>
        </v-row>
        <!--제목 내용 뷰-->
        <v-row class="pt-2">
          <v-textarea
            v-model="feed.title"
            label="제목"
            variant="outlined"
            rows="1"
            class="mt-3"
            no-resize
            :readonly="editable"
          ></v-textarea>
        </v-row>
        <v-row>
          <!-- <v-textarea
            v-model="feed.content"
            variant="outlined"
            rows="4"
            row-height="40"
            :readonly="editable"
          ></v-textarea> -->
          <v-textarea
            label="설명"
            :rules="rules"
            v-model="feed.content"
            no-resize
            rows="4"
            :readonly="editable"
            variant="outlined"
          ></v-textarea>
        </v-row>

        <v-row class="d-flex justify-end">
          <div v-if="editable">
            <v-btn color="#FEE440" variant="outlined" class="mr-3" @click="modify"> 수정</v-btn>
            <v-btn color="#FF865E" variant="outlined" @click="deleteFeed"> 삭제</v-btn>
          </div>
          <div v-else>
            <v-btn color="#A2D2FF" variant="outlined" class="mr-3" @click="updateFeedDetail">
              등록</v-btn
            >
            <v-btn color="#FF865E" variant="outlined" @click="cancle"> 취소</v-btn>
          </div>
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

import SimpleImageCard from "@/components/cards/SimpleImageCard.vue";
// import ImageTextDialog from "@/components/dialogs/ImageTextDialog.vue";
export default {
  name: "FeedDetailView",
  data: () => ({
    editable: true,
    rules: [(v) => v.length <= 250 || "최대 250자"],
    imgClicked: false,
  }),
  components: { TripTimeLine, SimpleImageCard },
  computed: {
    ...mapState("feedStore", ["feed"]),
    ...mapState("authStore", ["isLogin", "userInfo"]),
    ...mapGetters("feedStore", ["showFeed"]),
  },
  created() {
    this.getFeedDetail(this.$route.params.feedId); // [2]
    if (this.isLogin) {
      http.post("/articles/history", {
        params: {
          userId: this.userInfo.id,
          postId: this.$route.params.feedId,
        },
      });
    }
  },
  methods: {
    ...mapActions("feedStore", ["getFeedDetail", "updateFeedDetail", "deleteFeed"]), // [1]
    modify() {
      this.reverse();
    },
    cancle() {
      this.reverse();
      router.replace({ path: "/feed" });
    },
    reverse() {
      this.editable = !this.editable;
    },
    clickPlaceImg(e) {
      this.imgClicked = true;
      console.log("****", e.target.parentElement.id);
    },
  },
};
</script>

<style scoped>
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
