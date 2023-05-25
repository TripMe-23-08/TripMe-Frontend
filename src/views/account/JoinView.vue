<template>
  <v-container class="mt-5 text-center" style="max-width: 600px">
    <v-card class="borderwidth" variant="outlined" color="#a2d2ff">
      <v-card-title class="join">JOIN</v-card-title>
      <form width="200" class="mx-auto content" @submit.prevent="submit">
        <v-text-field
          class="ma-5"
          label="이메일"
          variant="outlined"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          label="비밀번호"
          variant="outlined"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          label="닉네임"
          variant="outlined"
          v-model="nickName.value.value"
          :error-messages="nickName.errorMessage.value"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          label="전화번호"
          variant="outlined"
          v-model="phoneNumber.value.value"
          :error-messages="phoneNumber.errorMessage.value"
        ></v-text-field>

        <v-btn color="skyblue" class="mb-3" variant="tonal" type="submit" @click="submit">
          submit
        </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { useField, useForm } from "vee-validate";
import http from "@/api/http";
import router from "@/router";
export default {
  name: "joinView",
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        email(value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "이메일을 필수 입력하세요";
        },
        nickName(value) {
          if (value?.length >= 2) return true;

          return "닉네임은 두 글자 이상 입력하세요";
        },
        password(value) {
          if (value?.length >= 2) return true;

          return "비밀번호는 적어도 두 글자 이상 입력하세요";
        },
        phoneNumber(value) {
          if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

          return "휴대폰 번호는 적어도 9글자 이상 입력하세요";
        },
      },
    });
    const nickName = useField("nickName");
    const phoneNumber = useField("phoneNumber");
    const email = useField("email");
    const password = useField("password");

    const submit = handleSubmit((values) => {
      http.post("/users", values).then(({ data }) => {
        console.log(data);
      });
      router.replace({ name: "loginView" });
    });

    return { nickName, phoneNumber, email, password, submit };
  },
};
</script>
<style scoped>
.content {
  font-family: "LeeSeoyun";
  font-size: 20px;
}
.join {
  margin: 15px;
  padding: 15px;
  font-weight: bold;
  font-family: "Rubik Puddles", cursive;
  font-size: 50px;
  color: skyblue;
}
.borderwidth {
  border-width: 5px;
  border-radius: 50px;
}
</style>
