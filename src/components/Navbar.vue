<template>
  <div
    class="bg-white sticky top-0 left-0 right-0 z-10 select-none py-3 px-5 border-b shadow flex flex-row items-center justify-between">
    <router-link
      to="/dashboard"
      v-if="isLoggedIn"
      class="py-2 text-gray-800 font-medium hover:text-cyan-600 cursor-pointer rounded-md"
      >🧙‍♂️&nbsp;Feedback&nbsp;Wizard</router-link
    >
    <router-link
      to="/"
      v-if="!isLoggedIn"
      class="py-2 text-gray-800 font-medium hover:text-cyan-600 cursor-pointer rounded-md"
      >🧙‍♂️&nbsp;Feedback&nbsp;Wizard</router-link
    >
    <!-- Mobile Nav -->
    <div class="flex md:hidden flex-row gap-5 relative items-center justify-end">
      <ButtonPrimary class="w-10 h-10" @click="toggleMobileNav"><i class="ri-menu-3-line"></i></ButtonPrimary>
      <div :class="{ hidden: !showMobileNav }" class="absolute z-10 top-12 left-auto right-0 w-auto bg-white shadow-md rounded-lg p-6 flex flex-grow flex-col gap-4 items-start justify-center">
        <ButtonPrimary v-if="isLoggedIn" class="w-full px-10" @click="router.push(`/dashboard`)">Dashboard</ButtonPrimary>
        <ButtonLight v-if="isLoggedIn" class="w-full px-10" @click="logOut">Logout</ButtonLight>
        <ButtonPrimary v-if="!isLoggedIn" class="w-full px-10" @click="router.push(`/create-account`)">Create&nbsp;account</ButtonPrimary>
        <ButtonLight v-if="!isLoggedIn" class="w-full px-10" @click="router.push(`/login`)">Login</ButtonLight>
      </div>
    </div>
    <!-- Desktop Nav -->
    <div class="hidden md:flex flex-row gap-5 items-center justify-end">
      <ButtonPrimary v-if="isLoggedIn" @click="router.push(`/dashboard`)">Dashboard</ButtonPrimary>
      <ButtonLight v-if="isLoggedIn" @click="logOut">Logout</ButtonLight>
      <ButtonPrimary v-if="!isLoggedIn" @click="router.push(`/create-account`)">Create&nbsp;account</ButtonPrimary>
      <ButtonLight v-if="!isLoggedIn" @click="router.push(`/login`)">Login</ButtonLight>
    </div>
  </div>
</template>
<script setup>
import ButtonLight from "@/components/forms/ButtonLight";
import ButtonPrimary from "@/components/forms/ButtonPrimary";
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
}

const logOut = () => {
  signOut(auth).then(() => {
    router.push("/login");
  });
};
</script>
