<template>
  <Navbar></Navbar>
  <div class="relative w-full m-auto max-w-sm max-h-full p-5 pt-10 md:pt-32">
    <!-- Modal content -->
    <div class="font-semibold text-3xl mb-6 text-gray-900 dark:text-white">
      <span class="text-4xl -ml-2">🧙‍♂️</span>&nbsp;Create account
    </div>
    <form class="space-y-6" @submit.prevent="createAccount">
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
      <InputText
        label="Verify password"
        v-model="verifyPassword"
        type="password"
        placeholder="********" />
      <div
        v-if="errorMessage"
        class="block text-center text-red-600 font-semibold">
        {{ errorMessage }}
      </div>
      <ButtonPrimary type="submit" class="w-full">
        Create account
      </ButtonPrimary>
      <div class="text-center text-gray-500">
        Already have an account?
        <router-link
          to="/login"
          class="text-blue-500 hover:text-blue-600 font-medium underline"
          >Login now.</router-link
        >
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import Navbar from "@/components/Navbar";
import ButtonPrimary from "@/components/forms/ButtonPrimary";
import InputText from "@/components/forms/InputText";

const email = ref("");
const password = ref("");
const verifyPassword = ref("");
const errorMessage = ref();
const router = useRouter();

const createAccount = () => {
  errorMessage.value = null; 
  
  // Check that email and password are valid
  if (!isValidEmail(email.value)) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }
  if (!isValidPassword(password.value)) {
    errorMessage.value = "Password must be at least 8 characters long.";
    return;
  }
  if (password.value !== verifyPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  // Create account
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      sendEmailVerification(getAuth().currentUser)
        .then(() => {
          // Email verification sent successfully
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Failed to send email verification", error);
        });
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage.value =
            "Oops! It looks like that email address is already taken. Time to get creative and come up with a new one! Make sure to verify your email address before signing in.";
          break;
        default:
          errorMessage.value =
            "Uh-oh, something went wrong. Please check your email and password and try again.";
          break;
      }
    });
};

const isValidEmail = (email) => {
  // Basic email validation
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const isValidPassword = (password) => {
  // Password must be at least 8 characters long
  return password.length >= 8;
};
</script>
