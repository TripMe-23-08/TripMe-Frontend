<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-sheet
          rounded
          class="pa-2 mt-16 w-screen"
          color="#FEF9EF"
          height="450px"
          min-width="200px"
          max-width="300px"
        >
          <v-row justify="center">
            <v-col>
              <div class="ma-12">
                <v-img
                  :aspect-ratio="3 / 4"
                  cover
                  width="150"
                  class="bg-white"
                  :src="require('@/assets/day.jpg')"
                ></v-img>
              </div>
              <v-btn
                color="#FEE440"
                class="mb-3 btn"
                elevation="0"
                width="160px"
                :key="labels.title"
                :href="labels.link"
              >
                기본 정보 수정
              </v-btn>
              <v-dialog v-model="dialog" persistent width="700">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    color="#FF865E"
                    elevation="0"
                    class="mb-3 btn"
                    width="160px"
                  >
                    회원탈퇴
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <div class="btn" style="font-size: 30px">회원 탈퇴</div>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="8">
                          <v-text-field
                            class="btn"
                            label="비밀번호*"
                            type="password"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6"> </v-col>
                      </v-row>
                    </v-container>
                    <small class="btn">*탈퇴를 원한다면 해당 계정의 비밀번호를 입력해주세요</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="btn" color="blue-darken-1" variant="text" @click="dialog = false">
                      그만두기
                    </v-btn>
                    <v-btn class="btn" color="red" variant="text" @click="moveMain"> 탈퇴 </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="1" />
      <v-col cols="6">
        <v-sheet
          rounded
          class="pa-2 mt-16"
          color="#FEF9EF"
          height="550px"
          max-width="600px"
          min-width="300px"
        >
          <row>
            <v-chip class="ma-2 btn" color="#A2D2FF" label> 기본 정보 수정 </v-chip>
            <form class="btn" @submit.prevent="submit">
              <v-text-field
                v-model="name.value.value"
                :error-messages="name.errorMessage.value"
                variant="outlined"
                class="ma-3"
                label="닉네임"
              ></v-text-field>
              <v-text-field
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
                variant="outlined"
                class="ma-3"
                label="이메일"
              ></v-text-field>
              <v-text-field
                v-model="phone.value.value"
                :error-messages="phone.errorMessage.value"
                variant="outlined"
                class="ma-3"
                label="전화번호"
              ></v-text-field>
              <v-text-field
                v-model="address.value.value"
                :error-messages="address.errorMessage.value"
                variant="outlined"
                class="ma-3"
                label="주소"
              ></v-text-field>
              <v-btn color="white" class="ma-3" width="160px" type="submit"> SUBMIT </v-btn>
            </form>
          </row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useField, useForm } from "vee-validate";

export default {
  name: "mypageEdit",
  methods: {
    moveMain() {
      this.$router.push({ name: "home" });
    },
  },
  data: () => ({
    dialog: false,
    labels: { title: "기본 정보 수정", link: "/edit" },
  }),
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        name(value) {
          if (value?.length >= 2) return true;

          return "닉네임은 두 글자 이상 입력하세요";
        },
        phone(value) {
          if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

          return "휴대폰 번호는 적어도 9글자 이상 입력하세요";
        },
        email(value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "이메일을 필수 입력하세요";
        },
        address(value) {
          if (value?.length >= 2) return true;

          return "주소는 적어도 두 글자 이상 입력하세요";
        },
      },
    });
    const name = useField("name");
    const phone = useField("phone");
    const email = useField("email");
    const address = useField("address");

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
    });

    return { name, phone, email, address, submit };
  },
};
</script>

<style scoped>
.btn {
  font-family: "LeeSeoyun";
  font-weight: bold;
  font-size: 20px;
  height: 50px;
}
</style>
