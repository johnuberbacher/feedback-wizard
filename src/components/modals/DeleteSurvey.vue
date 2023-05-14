<template>
  <!-- Modal -->
  <div
    id="delete-survey-modal"
    tabindex="-1"
    aria-hidden="true"
    class="after:content-[''] after:z-[-1] after:fixed after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-gray-900/50 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full m-auto max-w-sm max-h-full pt-10 md:pt-32">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <button
          @click="$emit('deleteSurveyModal')"
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-10">
          <div class="text-2xl font-medium mb-5 text-center">Heads up!</div>
          <div class="font-base text-gray-600 mb-5 text-center">
            Deleting a survey is a permanent action that cannot be undone.
            Are you sure you want to proceed?
          </div>
          <div class="w-full flex flex-row gap-4">
            <button
                @click="$emit('deleteSurvey')"
              type="submit"
              class="w-full text-white bg-cyan-600 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg py-3 px-6 text-center"
            >
              Delete
            </button>
            <button
              @click="$emit('deleteSurveyModal')"
              type="submit"
              class="w-full text-gray-700 bg-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg py-3 px-6 text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>
