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
          :tripRoute="selectedRoute"
        />
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 ma-2">
        <v-row style="overflow: auto; height: 300px">
          <v-col class="d-flex child-flex" cols="4">
            <div class="v-responsive v-img v-img--booting bg-grey-lighten-2">
              <input
                type="file"
                id="file"
                ref="files"
                @change="imageAddUpload"
                multiple
              />
            </div>
          </v-col>
          <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
            <v-img
              :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
              aspect-ratio="1"
              cover
              class="bg-grey-lighten-2"
            >
            </v-img>
          </v-col>
        </v-row>
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
  name: "FeedEdit",
  components: { TripTimeLine },
  data: () => ({
    selectedRoute: null,
    // Post 등록시, 서버에 넘겨야 하는 정보
    feed: {
      title: "",
      content: "",
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
              "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRW1haWwiOiJhYUBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IuydtOumhOydtOumhCIsInVzZXJJZCI6Mywic3ViIjoiYWNjZXNzLXRva2VuIiwiaWF0IjoxNjg0Nzc1OTQxLCJleHAiOjE2ODQ3Nzk1NDF9.byM8cixkAkkP3wxB4ADcafTNTGTtWfea5jRqZGVxnVk",
          },
        }
      );
      router.replace({ path: "/feed" });
    },
  },
};
</script>

<style scoped></style>
