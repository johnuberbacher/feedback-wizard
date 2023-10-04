<template>
  <Navbar></Navbar>
  <div class="relative w-full m-auto max-w-sm max-h-full p-5 pt-10 md:pt-32">
    <!-- Modal content -->
    <div class="font-semibold text-3xl mb-6 text-gray-900 dark:text-white">
      <span class="text-4xl -ml-2">🧙‍♂️</span>&nbsp;Login
    </div>
    <form class="space-y-6" @submit.prevent="createNewSurvey">
      <InputText
        label="Email address"
        v-model="email"
        type="type"
        placeholder="email@address.com" />
      <InputText
        label="Password"
        v-model="password"
        type="password"
        placeholder="********" />
      <div
        v-if="errorMessage"
        class="block text-center text-red-600 font-semibold">
        {{ errorMessage }}
      </div>
      <ButtonPrimary class="w-full" type="submit" @click="login"
        >Login</ButtonPrimary
      >
      <div class="text-center text-gray-500">
        Don't have an account yet?
        <router-link
          to="/create-account"
          class="text-blue-500 hover:text-blue-600 font-medium underline"
          >Create one now.</router-link
        >
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Navbar from "@/components/Navbar";
import ButtonPrimary from "@/components/forms/ButtonPrimary";
import InputText from "@/components/forms/InputText";

const email = ref("");
const password = ref("");
const errorMessage = ref();
const router = useRouter();

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      router.push("/dashboard");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage.value =
            "Uh-oh, that email address seems to be in use already.";
          break;
        default:
          errorMessage.value =
            "Uh-oh, something went wrong. Please check your email and password and try again.";
          break;
      }
    });
};

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push("/dashboard");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage.value =
            "Uh-oh, that email address seems to be in use already.";
          break;
        case "auth/invalid-email":
          errorMessage.value =
            "Uh-oh, that email address doesn't look right. Please try again with a valid email address.";
          break;
        case "auth/user-not-found":
          errorMessage.value =
            "We couldn't find an account with that email address. Are you sure you've registered with us before?";
          break;
        case "auth/wrong-password":
          errorMessage.value =
            "Oops! The password you entered is incorrect. Please try again.";
          break;
        default:
          errorMessage.value =
            "Uh-oh, something went wrong. Please check your email and password and try again.";
          break;
      }
    });
};
</script>
