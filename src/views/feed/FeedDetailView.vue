<template>
  <v-row no-gutters>
    <v-col>
      <v-select
        hide-no-data="true"
        v-model="feed.tripRoute"
        label="여행 경로 선택"
        return-object
        item-title="name"
        item-value="id"
        variant="outlined"
        density="compact"
      >
      </v-select>
      <v-sheet class="pa-2 ma-2">
        <trip-time-line
          direction="vertical"
          :tripPlaces="
            showFeed.tripRoute ? showFeed.tripRoute.tripPlaces : null
          "
        />
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 ma-2">
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
        <v-row id="trip-route-img">
          <v-col
            v-for="tripPlace in feed.tripRoute.tripPlaces"
            :key="tripPlace"
            cols="3"
          >
            <simple-image-card
              :place-info="tripPlace.place"
              @click="clickPlaceImg"
            />

            <!--TODO : Dialog 추가-->
            <!-- <image-text-dialog :clickedPlaceInfo="tripPlace.place" /> -->
          </v-col>
        </v-row>
        <!--제목 내용 뷰-->
        <v-row class="pt-2">
          <v-textarea
            v-model="feed.title"
            variant="outlined"
            rows="1"
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
            counter
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
            <v-btn @click="modify"> 수정</v-btn>
            <v-btn @click="deleteFeed"> 삭제</v-btn>
          </div>
          <div v-else>
            <v-btn @click="updateFeedDetail"> 등록</v-btn>
            <v-btn @click="cancle"> 취소</v-btn>
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
    ...mapGetters("feedStore", ["showFeed"]),
  },
  created() {
    this.getFeedDetail(this.$route.params.feedId); // [2]
  },
  methods: {
    ...mapActions("feedStore", [
      "getFeedDetail",
      "updateFeedDetail",
      "deleteFeed",
    ]), // [1]
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
</style>
