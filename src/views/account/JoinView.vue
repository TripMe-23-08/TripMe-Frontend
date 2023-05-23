<template>
  <v-container class="mt-5" style="max-width: 500px">
    <v-card text="회원가입" variant="outlined">
      <form width="200" class="mx-auto" @submit.prevent="submit">
        <v-text-field
          class="ma-5"
          label="이메일"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          :counter="7"
          label="비밀번호"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          :counter="10"
          label="닉네임"
          v-model="nickName.value.value"
          :error-messages="nickName.errorMessage.value"
        ></v-text-field>

   

        <v-text-field
          class="ma-5"
          label="전화번호"
          v-model="phoneNumber.value.value"
          :error-messages="phoneNumber.errorMessage.value"
        ></v-text-field>

       
        <v-btn class="mb-3" type="submit" @click="submit"> submit </v-btn>
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
      http.post("/users", values)
      .then(({data}) => {
        console.log(data);
        });
      router.replace({ name: "loginView" });

    });

    return { nickName, phoneNumber, email, password, submit };
  },
};
</script>
<style></style>
