<template>
  <v-container fluid>
    <v-row rows="6">
      <v-col>
        <v-sheet class="pa-2 ma-5" color="#CFD8DC">
          <v-col cols="6">
            <v-img
              :width="200"
              aspect-ratio="1"
              cover
              class="ma-10"
              :src="require('@/assets/day.jpg')"
            ></v-img
          ></v-col>
          <v-col align="center" align-items="center">
            <v-chip variant="text"> 아이디 </v-chip>
          </v-col>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-sheet class="pa-2 ml-5 mb-5" color="#CFD8DC">
          <v-row justify="center">
            <v-btn color="#9E9E9E" class="mb-3 mt-5"> 기본 정보 수정 </v-btn>
          </v-row>
          <v-row justify="center">
            <v-btn color="#9E9E9E" class="mb-3"> 추가 정보 입력 </v-btn>
          </v-row>
          <v-row justify="center">
            <v-btn color="#9E9E9E" class="mb-3"> 회원 탈퇴 </v-btn>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col> </v-col>
      <v-col cols="7">
        <v-card class="mr-5 mb-5 h-100" color="#CFD8DC">
          <v-chip class="ma-2" label> 기본 정보 수정 </v-chip>
          <form>
            <v-text-field
              variant="outlined"
              class="ma-3"
              :counter="10"
              label="닉네임"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              class="ma-3"
              :counter="10"
              label="이메일"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              class="ma-3"
              :counter="10"
              label="전화번호"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              class="ma-3"
              :counter="10"
              label="주소"
            ></v-text-field>
          </form>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "mypageEdit",
};
</script>

<style scoped></style>