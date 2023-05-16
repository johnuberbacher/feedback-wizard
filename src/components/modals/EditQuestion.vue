<template>
  <div
    :id="props.question?.index"
    class="after:content-[''] after:z-[-1] after:fixed after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-gray-900/50 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center">
    <div class="relative w-full m-auto max-w-xl">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <button
          @click="$emit('editQuestionModal')"
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
      <form class="space-y-6" @submit.prevent="saveQuestion()">
        <div class="flex flex-col gap-y-0">
          <label class="block text-gray-500 font-medium mb-2"
            >Question Type</label
          >
          <InputRadio
            :model="question?.type"
            value="single"
            label="Single Choice"
            :tabindex="1 + 1"></InputRadio>
          <InputRadio
            :model="question?.type"
            value="multiple"
            label="Multiple Choice"
            :tabindex="1 + 1"></InputRadio>
          <InputRadio
            :model="question?.type"
            value="multiple"
            label="Text Input"
            :tabindex="1 + 1"></InputRadio>
        </div>
        <!-- Single Choice -->
        <div
          v-if="props.question?.type == 'single'"
          class="flex flex-col gap-y-2">
          <label class="block text-gray-500 font-medium"
            >Question Answers</label
          >
          <div
            v-for="(option, index) in props.question?.options"
            :key="index"
            class="w-full flex flex-row items-center">
            <InputText
              label=""
              type="text"
              :value="option"
              :model="option"
              placeholder="Question Answer" />
            <button
              type="button"
              class="ml-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center">
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path></svg><span class="sr-only">Close modal</span>
            </button>
          </div>
          <div
            class="bg-gray-50 border hover:bg-gray-100 text-gray-600 font-medium py-3 px-6 text-center rounded-lg cursor-pointer">
            add new question
          </div>
        </div>
        <div
          v-if="errorMessage"
          class="block text-center text-red-600 font-semibold">
          {{ errorMessage }}
        </div>
        <button
        @click="() => {
          showModal = false;
          return updateSurvey()
        }"
          type="submit"
          class="w-full text-white bg-cyan-600 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg py-3 px-6 text-center">
          Save Question
        </button>
      </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import {
  updateDoc,
  doc,
} from "firebase/firestore";
import InputText from "@/components/forms/InputText";
import InputRadio from "@/components/forms/InputRadio";
const props = defineProps(["question"]);
const newSurveyTitle = ref(null);
const newSurveyDescription = ref(null);
const newSurveyCreator = ref(null);

const tempQuestionTitle = ref("");
const tempQuestionType = ref("");
const tempQuestionOptions = ref([]);


const state = reactive({
  surveyList: [],
});

const saveQuestion = async (tempQuestion) => {
  const docRef = doc(db, "surveys", currentRoute);
  updateDoc(docRef, 
  { pageCount: 1000 });
}

onMounted(async () => {
  console.log(await props.question?.title);
});
</script>
