<template>
  <div
    class="after:content-[''] after:z-[-1] after:fixed after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-gray-900/50 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center">
    <div class="relative w-full m-auto max-w-xl">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <button
          @click="$emit('createNewSurveyModal')"
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-10">
          <div class="text-2xl font-medium text-gray-700 mb-8 text-center">
            Create a new survey
          </div>
          <form
            class="space-y-6"
            @submit.prevent="
              $emit('createNewSurvey', {
                newSurveyTitle: newSurveyTitle,
                newSurveyDescription: newSurveyDescription,
                newSurveyCreator: newSurveyCreator,
              })
            ">
            <div>
              <label
                for="newSurveyTitle"
                class="block text-gray-500 font-medium mb-2"
                >What's the survey called?</label
              >
              <input
                type="text"
                name="newSurveyTitle"
                v-model="newSurveyTitle"
                id="newSurveyTitle"
                class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block shadow w-full py-3 px-4"
                placeholder="Customer Satisfaction Feedback"
                required />
            </div>
            <div>
              <label
                for="newSurveyDescription"
                class="block text-gray-500 font-medium mb-2"
                >How would you describe the survey?</label
              >
              <textarea
                name="newSurveyDescription"
                id="newSurveyDescription"
                rows="5"
                v-model="newSurveyDescription"
                class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block shadow w-full py-3 px-4"
                placeholder="We're conducting this survey to gain insights into our customers' preferences and expectations. Your participation is essential to help us better serve you. Please take a few minutes to share your opinions with us."
                required></textarea>
            </div>
            <div>
              <label
                for="newSurveyCreator"
                class="block text-gray-500 font-medium mb-2"
                >Who's creating the survey?</label
              >
              <input
                type="text"
                name="newSurveyCreator"
                v-model="newSurveyCreator"
                id="newSurveyCreator"
                class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block shadow w-full py-3 px-4"
                placeholder="Bruce Wayne"
                required />
            </div>
            <div class="text-sm text-gray-400 text-center">
              Click continue and start getting feedback in minutes.
            </div>
            <button
              type="submit"
              class="w-full text-white bg-cyan-600 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg py-3 px-6 text-center">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import InputText from "@/components/forms/InputText";
const newSurveyTitle = ref(null);
const newSurveyDescription = ref(null);
const newSurveyCreator = ref(null);
</script>
