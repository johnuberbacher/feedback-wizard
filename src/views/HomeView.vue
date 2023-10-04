<template>
  <div>
    <Navbar></Navbar>
    <div
      class="w-full max-w-6xl mx-auto p-5 pt-10 md:pt-32 flex flex-col items-center justify-center text-center gap-y-5 md:gap-y-10"
    >
      <h1 class="max-w-5xl text-3xl md:text-6xl font-bold text-gray-900 dark:text-white">
        Create surveys, gather perspectives and receive feedback from your
        audience.
      </h1>
      <p class="max-w-2xl text-gray-700 dark:text-gray-300">
        Gain a deeper understanding of your audience by creating surveys and
        gathering their perspectives and feedback. This approach can help you
        identify opportunities for improvement and make data-driven decisions
        that align with your audience's needs and preferences.
      </p>
      <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <ButtonPrimary @click="router.push('/create-account')">Create an account</ButtonPrimary>
        <ButtonLight @click="router.push('/demo-survey')">Try Demo survey</ButtonLight>
      </div>
      <div
        class="max-w-[80%] md:max-w-4xl w-full mx-auto grid grid-cols-2 mt-3 md:grid-cols-2 gap-4 md:gap-10"
      >
        <img
          v-for="index in 4"
          :key="index"
          :src="require(`@/assets/img/preview${index}.png`)"
          class="w-full h-auto mx-auto bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow rounded-lg "
        />
      </div>
    </div>
    <Footer></Footer>
    
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ButtonLight from "@/components/forms/ButtonLight";
import ButtonPrimary from "@/components/forms/ButtonPrimary";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
