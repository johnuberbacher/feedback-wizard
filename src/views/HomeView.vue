<template>
  <div>
    <Navbar></Navbar>
    <div
      class="w-full max-w-6xl mx-auto p-5 pt-10 md:pt-32 flex flex-col items-center justify-center text-center gap-y-10 md:gap-y-20"
    >
      <h1 class="max-w-3xl text-3xl md:text-6xl font-bold">
        Create surveys and gather perspectives and feedback from your audience.
      </h1>
      <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          class="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-6 rounded-lg drop-shadow hover:drop-shadow-lg"
        >
          Create an account
        </button>
        <router-link to="/demo-survey"
          class="w-full md:w-auto bg-gray-300 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg"
        >
          Demo survey
        </router-link>
      </div>
      <div class="hidden w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <img
          src="@/assets/img/preview1.png"
          class="w-full h-auto bg-white drop-shadow-md rounded-lg"
        />
        <img
          src="@/assets/img/preview1.png"
          class="hidden md:block w-full h-auto bg-white drop-shadow-md rounded-lg"
        />
        <img
          src="@/assets/img/preview1.png"
          class="hidden md:block w-full h-auto bg-white drop-shadow-md rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>
