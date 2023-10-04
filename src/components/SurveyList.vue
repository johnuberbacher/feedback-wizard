<template>
    <div
    v-for="(survey, index) in sortedSurveyList"
    :id="survey.id"
    :key="survey.id"
    class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row gap-y-4 items-start justify-between">
    <div class="w-full flex flex-col items-start justify-start gap-0">
      <div class="w-full flex flex-col sm:flex-row items-start p-6 border-b border-gray-200 dark:border-gray-700 gap-x-2">
        <div
          v-if="survey.status == 'inactive'"
          class="w-full flex flex-col gap-y-2 text-gray-900 dark:text-white">
          <div class="block font-semibold text-md">
            {{ survey.title }}
          </div>
          <div class="text-sm text-gray-700 dark:text-gray-400">
            {{ survey.description }}
          </div>
        </div>
        <div
          v-if="survey.status == 'active'"
          class="w-full flex flex-col gap-y-2 ">
          <a
          target="_blank"
          :href="survey.id"
            class="flex flex-row items-center justify-start font-semibold text-md text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500">
            <i class="ri-external-link-line"></i>&nbsp;&nbsp;<span>{{
              survey.title
            }}</span>
          </a>
          <div class="text-sm text-gray-700 dark:text-gray-400">
            {{ survey.description }}
          </div>
        </div>
        <ButtonLight class="w-full sm:w-auto mt-4 sm:mt-0" @click="router.push(`/edit/` + survey.id)"
          ><span>Manage</span></ButtonLight
        >
      </div>
      <div class="w-full flex flex-row px-6 py-4 flex-wrap items-start justify-start gap-2">
        <SurveyStatus :status="survey.status"></SurveyStatus>
        <div
          class="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap">
          {{ responseLength(survey.responses?.length) }}
        </div>
        <div
          class="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap">
          {{ survey.views.length }} views
        </div>
    </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue";
import SurveyStatus from "./SurveyStatus.vue";
import ButtonLight from "./forms/ButtonLight.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["surveyList"]);

// Create a computed property to sort the surveyList by status
const sortedSurveyList = computed(() => {
  return props.surveyList.slice().sort((a, b) => {
    if (a.status === "active" && b.status !== "active") {
      return -1; // "a" comes before "b"
    } else if (a.status !== "active" && b.status === "active") {
      return 1; // "b" comes before "a"
    } else {
      return 0; // Maintain the original order for surveys with the same status
    }
  });
});

const responseLength = (responseLength) => {
  if (responseLength === 1) {
    return "1 response";
  } else {
    return `${responseLength} responses`;
  }
}

</script>