<template>
  <v-row no-gutters>
    <v-col cols="4">
      <v-sheet class="pa-2 ma-2">
        <v-select
          :items="['여행루트1', '여행루트2', '여행루트3']"
          variant="outlined"
          density="compact"
        ></v-select>
        <trip-time-line />
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
            variant="outlined"
            label="내용"
            rows="4"
            row-height="40"
          ></v-textarea>
        </v-row>
        <v-row class="d-flex justify-end">
          <v-btn variant="outlined"> 등록 </v-btn>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
  <!---->
</template>

<script>
import TripTimeLine from "@/components/feed/TripTimeLine.vue";

export default {
  name: "FeedEdit",
  components: { TripTimeLine },
  data: () => ({
    sortby: ["정확도", "조회수", "좋아요"],

    files: [], //업로드용 파일
    filesPreview: [],
    uploadImageIndex: 0, // 이미지 업로드를 위한 변수
  }),
  methods: {
    imageAddUpload() {
      console.log(this.$refs.files.files);

      // this.files = [...this.files, this.$refs.files.files];
      //하나의 배열로 넣기c
      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        console.log(this.uploadImageIndex);
        this.files = [
          ...this.files,
          //이미지 업로드
          {
            //실제 파일
            file: this.$refs.files.files[i],
            //이미지 프리뷰
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            //삭제및 관리를 위한 number
            number: i + this.uploadImageIndex,
          },
        ];
        num = i;
      }
      this.uploadImageIndex = this.uploadImageIndex + num + 1;

      console.log(this.files);
      // console.log(this.filesPreview);
    },
    fileDeleteButton(e) {
      const name = e.target.getAttribute("name");
      this.files = this.files.filter((data) => data.number !== Number(name));
      // console.log(this.files);
    },
  },
};
</script>

<style scoped></style>
