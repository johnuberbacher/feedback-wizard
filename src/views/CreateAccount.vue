<template>
  <Navbar></Navbar>
  <div class="relative w-full m-auto max-w-sm max-h-full p-5 pt-10 md:pt-32">
    <!-- Modal content -->
    <div class="font-semibold text-3xl mb-6">
      <span class="text-4xl -ml-2">🧙‍♂️</span>&nbsp;Create account
    </div>
    <form class="space-y-6" @submit.prevent="createAccount">
      <div>
        <label for="email" class="block text-gray-500 font-medium mb-2"
          >Email address</label
        >
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block shadow w-full py-3 px-4"
          placeholder="email@address.com"
          required
        />
      </div>
      <div>
        <label for="password" class="block text-gray-500 font-medium mb-2"
          >Password</label
        >
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block shadow w-full py-3 px-4"
          placeholder="**********"
          required
        />
      </div>
      <div>
        <label for="password" class="block text-gray-500 font-medium mb-2"
          >Verify password</label
        >
        <input
          type="password"
          name="verifyPassword"
          id="verifyPassword"
          v-model="verifyPassword"
          class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block shadow w-full py-3 px-4"
          placeholder="**********"
          required
        />
      </div>
      <div
        v-if="errorMessage"
        class="block text-center text-red-600 font-semibold"
      >
        {{ errorMessage }}
      </div>
      <button
        @click="login"
        type="submit"
        class="w-full text-white bg-cyan-600 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg py-3 px-6 text-center"
      >
        Create account
      </button>
      <div class="text-center text-gray-400">
        Already have an account?
        <router-link
          to="/login"
          class="text-cyan-600 hover:text-cyan-500 font-medium underline"
          >Login now.</router-link
        >
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Navbar from "@/components/Navbar";

const email = ref("");
const password = ref("");
const verifyPassword = ref("");
const errorMessage = ref();
const router = useRouter();

const createAccount = () => {
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
      router.push("/dashboard");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage.value =
            "Oops! It looks like that email address is already taken. Time to get creative and come up with a new one!";
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
