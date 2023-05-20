<template>
  <v-container class="mt-5" style="max-width: 500px">
    <v-card align="center" text="회원가입" variant="outlined">
      <form width="200" class="mx-auto" @submit.prevent="submit">
        <v-text-field
          class="ma-5"
          :counter="10"
          label="Id"
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          :counter="7"
          label="Password"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          label="Phone"
          v-model="phone.value.value"
          :error-messages="phone.errorMessage.value"
        ></v-text-field>

        <v-text-field
          class="ma-5"
          label="E-mail"
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
        ></v-text-field>

        <v-btn class="mb-3" type="submit"> submit </v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import { useField, useForm } from "vee-validate";

export default {
  name: "joinView",
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        name(value) {
          if (value?.length >= 2) return true;

          return "닉네임은 두 글자 이상 입력하세요";
        },
        password(value) {
          if (value?.length >= 2) return true;

          return "비밀번호는 적어도 두 글자 이상 입력하세요";
        },
        phone(value) {
          if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

          return "휴대폰 번호는 적어도 9글자 이상 입력하세요";
        },
        email(value) {
          if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

          return "이메일을 필수 입력하세요";
        },
      },
    });
    const name = useField("name");
    const phone = useField("phone");
    const email = useField("email");
    const password = useField("password");

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
    });

    return { name, phone, email, password, submit };
  },
};
</script>
<style></style>
