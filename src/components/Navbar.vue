<template>
  <div
    class="bg-white sticky top-0 left-0 right-0 z-10 select-none py-3 px-5 border-b drop-shadow flex flex-row items-center justify-between">
    <router-link
      to="/dashboard"
      v-if="isLoggedIn"
      class="font-semibold hover:text-cyan-500 cursor-pointer"
      >🧙‍♂️&nbsp;Feedback&nbsp;Wizard</router-link
    >
    <router-link
      to="/"
      v-if="!isLoggedIn"
      class="font-semibold hover:text-cyan-500 cursor-pointer"
      >🧙‍♂️&nbsp;Feedback&nbsp;Wizard</router-link
    >
    <!-- Mobile Nav -->
    <div class="flex md:hidden flex-row gap-5 relative items-center justify-end">
      <div @click="toggleMobileNav" style="" class="w-10 h-10 rounded-full bg-cyan-500 cursor-pointer"></div>
      <div :class="{ hidden: !showMobileNav }" class="absolute z-10 top-12 left-auto right-0 w-auto bg-white drop-shadow-md rounded-lg p-6 flex flex-grow flex-col gap-4 items-start justify-center">
        <router-link
          v-if="isLoggedIn"
          to="/dashboard"
          class="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 px-10 flex items-center justify-center text-center focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg cursor-pointer shadow"
          >Dashboard</router-link>
        <div
          v-if="isLoggedIn"
          @click="logOut"
          class="w-full bg-gray-50 border hover:bg-white text-gray-600 font-medium py-2 px-10 flex items-center justify-center text-center rounded-lg cursor-pointer">
          Logout
        </div>
      </div>
    </div>
    <!-- Desktop Nav -->
    <div class="hidden md:flex flex-row gap-5 items-center justify-end">
      <router-link
        v-if="isLoggedIn"
        to="/dashboard"
        class="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 px-5 flex items-center justify-center text-center focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg cursor-pointer shadow"
        >Dashboard</router-link
      >
      <div
        v-if="isLoggedIn"
        @click="logOut"
        class="bg-gray-50 border hover:bg-white text-gray-600 font-medium py-2 px-5 flex items-center justify-center text-center rounded-lg cursor-pointer"
      >
        Logout
      </div>
      <router-link
        to="/create-account"
        v-if="!isLoggedIn"
        class="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 px-5 flex items-center justify-center text-center focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg cursor-pointer shadow"
      >
        Create account
      </router-link>
      <router-link
        to="/login"
        v-if="!isLoggedIn"
        class="bg-gray-50 border hover:bg-white text-gray-600 font-medium py-2 px-5 flex items-center justify-center text-center rounded-lg cursor-pointer"
      >
        Login
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const showMobileNav = ref(false);
const router = useRouter();

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const toggleMobileNav = () => {
  showMobileNav.value = !showMobileNav.value
  console.log(showMobileNav.value)
}

const logOut = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};
</script>
