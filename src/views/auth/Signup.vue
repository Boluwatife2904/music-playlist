<template>
  <div class="auth">
    <form @submit.prevent="submitForm">
      <h3>Sign up</h3>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        v-model="username"
      />
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        v-model="email"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        v-model="password"
      />
      <button type="submit" :disabled="isLoading">
        <span v-if="isLoading">Loading</span>
        <span v-else>Sign up</span>
      </button>
      <div class="error" v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import signupAction from "@/composables/signupAction.js";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const username = ref("");
    const formIsInvalid = ref(false);
    const { error, isLoading, signup } = signupAction();

    const validateForm = () => {
      formIsInvalid.value = false;
      if (email.value === "") {
        formIsInvalid.value = true;
      }
      if (password.value === "") {
        formIsInvalid.value = true;
      }
      if (username.value === "") {
        formIsInvalid.value = true;
      }
    };

    const submitForm = async () => {
      validateForm();
      if (formIsInvalid.value) {
        return;
      }
      await signup(email.value, password.value, username.value);
      if(!error.value) {
        console.log("User signed in successfully");
        email.value = "";
        password.value = "";
      }
    };

    return {
      error,
      isLoading,
      email,
      password,
      username,
      submitForm,
    };
  },
};
</script>

<style>

</style>