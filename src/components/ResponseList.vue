<template>
  <div
    class="bg-white dark:bg-gray-800 dark:border-gray-700 shadow border border-gray-200 rounded-lg flex-col items-start justify-between overflow-hidden">
    <div
      v-for="(response, index) in responseList"
      :id="response.id"
      :key="response.id"
      class="p-6 flex flex-col sm:flex-row gap-4 items-start justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div class="flex flex-row items-start justify-between gap-4">
        <div
        class="bg-blue-600 rounded-full w-[40px] min-w-[40px] min-h-[40px] h-[40px] overflow-hidden flex items-center justify-center ring-2 ring-blue-600">
          <i class="ri-user-fill text-[40px] mt-3 text-white"></i>
        <!--<img
          src="https://media.licdn.com/dms/image/C4E03AQHVJqZulZuG0w/profile-displayphoto-shrink_100_100/0/1516994515408?e=1699488000&v=beta&t=Rd0jaMFTSacrPUjqqQc5Nd0qs8oo-nqM_1wmHX_p4Rc" />-->
      </div>
      <div class="w-full flex flex-col items-start justify-start gap-y-2">
        <div class="w-full flex flex-col text-gray-700">
          <div class="block font-semibold text-md text-gray-900 dark:text-white">
            {{ response.user ?? "Anonymous" }}
          </div>
          <div class="text-sm text-gray-700 dark:text-gray-400">
            Completed the
            <span class="font-semibold">{{ response.title }}</span> survey about {{ formatTimestamp(response.responseDate) }}
          </div>
        </div>
      </div>
      </div>
      <ButtonLight @click="$emit('viewResponse', response)"><span>View</span></ButtonLight>
    </div>
  </div>
  </template>
  <script setup>
  import ButtonLight from "./forms/ButtonLight.vue";
  import { defineProps } from "vue";
  const props = defineProps(["responseList"]);

  function formatTimestamp(responseDate) {
    if (!responseDate) {
      return ""; // Handle the case where responseDate is undefined
    }
  
    // Convert Firebase Timestamp to JavaScript Date
    const date = responseDate.toDate();
    const now = new Date(); // Current date and time
  
    const timeDifferenceInSeconds = Math.floor((now - date) / 1000); // Calculate the time difference in seconds
  
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} seconds ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }
  
  const formattedTimestamp = formatTimestamp(props.responseList.responseDate);
  console.log(formattedTimestamp);
  </script>
  