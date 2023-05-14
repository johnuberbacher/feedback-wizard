<template>
  <Navbar></Navbar>
  <div class="relative w-full m-auto max-w-sm max-h-full p-5 pt-10 md:pt-32">
    <!-- Modal content -->
    <div class="font-semibold text-3xl mb-6"><span class="text-4xl -ml-2">🧙‍♂️</span>&nbsp;Login</div>
    <form class="space-y-6" @submit.prevent="createNewSurvey">
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
      <div
        v-if="errorMessage"
        class="block text-center text-red-600 font-semibold"
      >
        {{ errorMessage }}
      </div>
      <button hover:text-cyan-500 cursor-pointer
        @click="login"
        type="submit"
        class="w-full text-white bg-cyan-600 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg py-3 px-6 text-center"
      >
        Login
      </button>
      <button hover:text-cyan-500 cursor-pointer
        @click="signInWithGoogle"
        type="submit"
        class="w-full bg-gray-50 border hover:bg-white text-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg py-3 px-6 text-center"
      >
        Sign in with Google
      </button>
      <div class="text-center text-gray-400">Don't have an account yet? <router-link to="/create-account" class="text-cyan-600 hover:text-cyan-500 font-medium underline">Create one now.</router-link></div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import Navbar from "@/components/Navbar.vue";

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
          errorMessage.value = "Uh-oh, that email address doesn't look right. Please try again with a valid email address.";
          break;
        case "auth/user-not-found":
          errorMessage.value = "We couldn't find an account with that email address. Are you sure you've registered with us before?";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Oops! The password you entered is incorrect. Please try again.";
          break;
        default:
          errorMessage.value = "Uh-oh, something went wrong. Please check your email and password and try again.";
          break;
      }
    });
};
</script>
