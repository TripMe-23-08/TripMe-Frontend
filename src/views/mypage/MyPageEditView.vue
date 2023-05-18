<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-sheet class="pa-2 ml-5 mb-5" color="#CFD8DC" min-width="200px">
          <v-row justify="center">
            <v-col>
              <v-img aspect-ratio="1" cover class="ma-5" :src="require('@/assets/day.jpg')"></v-img>
              <v-btn
                color="#9E9E9E"
                class="ma-3"
                width="160px"
                :key="labels.title"
                :href="labels.link"
              >
                기본 정보 수정
              </v-btn>
              <v-dialog v-model="dialog" persistent width="1024">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" color="#9E9E9E" class="ma-3" width="160px">
                    회원탈퇴
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">User Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6"> </v-col>
                      </v-row>
                    </v-container>
                    <small>*탈퇴를 원한다면 해당 계정의 비밀번호를 입력해주세요</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                      그만두기
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="moveMain"> 탈퇴 </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="6">
        <v-sheet class="mr-5 mb-5 h-100" color="#CFD8DC" min-width="300px">
          <v-chip class="ma-2" label> 기본 정보 수정 </v-chip>
          <form @submit.prevent="submit">
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
        </v-sheet>
      </v-col>
      <v-col></v-col>
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

<style scoped></style>
