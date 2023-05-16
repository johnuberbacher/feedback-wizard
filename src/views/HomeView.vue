<template>
  <div>
    <Navbar></Navbar>
    <div
      class="w-full max-w-6xl mx-auto p-5 pt-10 md:py-32 flex flex-col items-center justify-center text-center gap-y-5 md:gap-y-10"
    >
      <h1 class="max-w-5xl text-3xl md:text-6xl font-bold text-gray-800">
        Create surveys, gather perspectives and receive feedback from your
        audience.
      </h1>
      <p class="max-w-2xl">
        Gain a deeper understanding of your audience by creating surveys and
        gathering their perspectives and feedback. This approach can help you
        identify opportunities for improvement and make data-driven decisions
        that align with your audience's needs and preferences.
      </p>
      <div class="flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          class="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 text-white focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium py-3 px-6 rounded-lg drop-shadow hover:drop-shadow-lg"
        >
          Create an account
        </button>
        <router-link
          to="/demo-survey"
          class="w-full md:w-auto border bg-white hover:bg-white text-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium py-3 px-6 rounded-lg hover:drop-shadow-lg"
        >
          Try Demo survey
        </router-link>
      </div>
      <div
        class="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        <img
          v-for="index in 6"
          :key="index"
          :src="require(`@/assets/img/preview${index}.png`)"
          class="w-full h-auto mx-auto bg-white drop-shadow-md rounded-lg"
        />
      </div>
    </div>
    <div class="mx-auto p-5 pb-10 text-center text-gray-400">
      Built with 💙 by <a
        href="https://github.com/johnuberbacher/feedback-wizard"
        target="_blank"
        class="text-cyan-600 hover:text-cyan-500 font-medium underline"
        >John Uberbacher</a
      >
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar";
</script>
