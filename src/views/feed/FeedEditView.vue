<template>
  <v-row no-gutters>
    <v-col>
      <v-sheet class="pa-2 ma-2">
        <v-select
          hide-no-data="true"
          v-model="selectedRoute"
          label="여행 경로 선택"
          return-object
          :items="tripRoutes"
          item-title="name"
          item-value="id"
          variant="outlined"
          density="compact"
        >
        </v-select>

        <trip-time-line
          v-if="selectedRoute != null"
          direction="vertical"
          :tripPlaces="selectedRoute && selectedRoute.tripPlaces"
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
            v-bind="title"
            variant="outlined"
            label="제목"
            rows="1"
          ></v-textarea>
        </v-row>
        <v-row>
          <v-textarea
            v-bind="content"
            variant="outlined"
            label="내용"
            rows="4"
            row-height="40"
          ></v-textarea>
        </v-row>
        <v-row class="d-flex justify-end">
          <v-btn variant="outlined" @onclick="modifyFeed"> 등록 </v-btn>
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
  name: "FeedEdit",
  components: { TripTimeLine },
  data: () => ({
    selectedRoute: null,
    // Post 등록시, 서버에 넘겨야 하는 정보
    title: "",
    content: "",
  }),

  computed: {
    ...mapState("feedStore", ["tripRoutes"]),
  },
  created() {
    this.getTripRoutes(); // [2]
  },
  methods: {
    ...mapActions("feedStore", ["getTripRoutes"]), // [1]
  },
};
</script>

<style scoped></style>
