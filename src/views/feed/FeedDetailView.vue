<template>
  <v-row no-gutters>
    <v-col>
      <v-sheet class="pa-2 ma-2">
        <trip-time-line
          direction="vertical"
          :tripPlaces="feed.tripRoute.tripPlaces"
        />
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 ma-2">
        <!--이미지 업로드 뷰-->
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
        <!--제목 내용 뷰-->
        <v-row class="pt-2">
          <v-textarea
            :value="feed.title"
            variant="outlined"
            rows="1"
            readonly
          ></v-textarea>
        </v-row>
        <v-row>
          <v-textarea
            :value="feed.content"
            variant="outlined"
            rows="4"
            row-height="40"
            readonly
          ></v-textarea>
        </v-row>
        <v-row class="d-flex justify-end">
          <v-btn>
            <router-link
              :to="{
                name: 'feedDetailEdit',
                params: { feedId: feed.id },
              }"
              >수정</router-link
            ></v-btn
          >
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
  <!---->
</template>

<script>
import TripTimeLine from "@/components/feed/TripTimeLine.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "FeedDetailView",
  components: { TripTimeLine },
  computed: {
    ...mapState("feedStore", ["feed"]),
  },
  created() {
    this.getFeedDetail(this.$route.params.feedId); // [2]
  },
  methods: {
    ...mapActions("feedStore", ["getFeedDetail"]), // [1]
  },
};
</script>

<style scoped></style>
