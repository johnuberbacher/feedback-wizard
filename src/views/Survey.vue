<template>
  <div class="flex flex-col md:flex-row" v-if="state.survey">
    <aside
      class="w-full md:max-w-[360px] md:min-w-[360px] bg-white md:border-r shadow md:shadow-lg relative">
      <div
        class="h-full p-5 md:p-10 md:pt-32 overflow-y-auto bg-white flex flex-col justify-between">
        <div class="w-ful flex flex-col gap-y-4">
          <div v-if="state.survey.creator" class="font-semibold select-none">
            {{ state.survey.creator ?? "🧙‍♂️ FeedbackWizard" }}
          </div>
          <hr class="block md:hidden -mx-[20px]" />
          <div class="font-bold text-3xl">
            {{ state.survey.title ?? "Survey" }}
          </div>
          <div class="text-gray-500">
            {{ state.survey.description }}
          </div>
        </div>
        <router-link
          to="/"
          class="hidden md:block text-gray-500 hover:text-cyan-500 text-base cursor-pointer mt-4">
          Made&nbsp;with&nbsp;<span class="font-medium"
            >🧙‍♂️&nbsp;FeedbackWizard</span
          >
        </router-link>
      </div>
    </aside>
    <div class="w-full h-full md:min-h-screen bg-gray-50">
      <div class="md:py-32 p-5 md:p-10" v-if="state.survey.questions">
        <!-- Feedback Complete -->
        <div
          v-if="state.currentQuestion >= state.survey.questions.length"
          class="w-full max-w-[400px] mx-auto flex flex-col items-center justify-center gap-y-4 text-center">
          <i class="ri-checkbox-circle-fill text-5xl text-cyan-600"></i>
          <div class="block font-semibold text-3xl text-gray-700">
            Survey complete!
          </div>
          <div class="font-semibold text-slate-400">
            Thank you for taking part in our survey.
          </div>
        </div>
        <!-- Feedback Survey -->
        <div
          v-if="state.currentQuestion + 1 <= state.survey.questions.length"
          class="w-full max-w-3xl mx-auto flex flex-col items-stretch justify-start gap-y-4">
          <div class="block text-gray-400 font-medium">
            Question&nbsp;{{ state.currentQuestion + 1 }} of
            {{ state.survey.questions.length }}
          </div>
          <div class="block font-semibold text-2xl text-gray-700">
            {{ state.survey.questions[state.currentQuestion].title }}
          </div>
          <!-- Single Choice Question -->
          <div
            class="flex flex-col my-2"
            v-if="
              state.survey.questions[state.currentQuestion].type === 'single'
            ">
            <div
              v-for="(option, index) in state.survey.questions[
                state.currentQuestion
              ].options"
              :key="option">
              <InputRadio
                :label="option"
                :group="state.survey.questions[state.currentQuestion]"
                :id="'radio-' + index"
                :name="state.survey.questions[state.currentQuestion]"
                :value="option"
                :tabindex="1 + 1"
                v-model="state.responseForm.questions[state.currentQuestion]" />
            </div>
          </div>
          <!-- Multiple Choice Question -->
          <div
            class="flex flex-col my-2"
            v-if="
              state.survey.questions[state.currentQuestion].type === 'multiple'
            ">
            <div
              v-for="(option, index) in state.survey.questions[
                state.currentQuestion
              ].options"
              :key="option">
              <InputCheck
                :label="option"
                :group="state.survey.questions[state.currentQuestion]"
                :id="'check-' + index"
                :name="state.survey.questions[state.currentQuestion]"
                :value="option"
                :tabindex="1 + 1"
                v-model="state.responseForm.questions[state.currentQuestion]" />
            </div>
          </div>
          <!-- Text Question -->
          <div
            class="my-2"
            v-if="
              state.survey.questions[state.currentQuestion].type === 'text'
            ">
            <InputTextArea
              id="message"
              placeholder="Write your thoughts here..."
              v-model="state.responseForm.questions[state.currentQuestion]" />
          </div>
          <!-- Mood Question -->
          <div
            class="w-full flex flex-col lg:flex-row items-stretch justify-start gap-4 my-2"
            v-if="
              state.survey.questions[state.currentQuestion].type === 'mood'
            ">
            <div
              class="w-full"
              v-for="(option, index) in state.survey.questions[
                state.currentQuestion
              ].options"
              :key="option">
              <InputMood
                :label="option"
                :group="state.survey.questions[state.currentQuestion]"
                :id="'mood-' + index"
                :name="state.survey.questions[state.currentQuestion]"
                :value="option"
                :tabindex="1 + 1"
                :index="index"
                v-model="state.responseForm.questions[state.currentQuestion]" />
            </div>
          </div>
          <div
            v-if="errorMessage"
            class="block text-red-600 font-semibold mb-4">
            {{ errorMessage }}
          </div>
          <div class="flex flex-row items-stretch justify-start gap-4">
            <ButtonLight
              v-if="state.currentQuestion > 0"
              tabindex="-1"
              @click="decrementQuestion()"
              >Back</ButtonLight
            >
            <ButtonPrimary
              tabindex="(state.survey.questions[state.currentQuestion].options?.length + 1)"
              @click="
                incrementQuestion(
                  state.survey.questions[state.currentQuestion],
                  state.responseForm.questions[state.currentQuestion]
                )
              "
              >Continue</ButtonPrimary
            >
          </div>
        </div>
        <router-link
          to="/"
          class="block md:hidden text-gray-500 hover:text-cyan-500 text-base cursor-pointer mt-24">
          Made&nbsp;with&nbsp;<span class="font-medium"
            >🧙‍♂️&nbsp;FeedbackWizard</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { getFirestore, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { fb } from "@/plugins/firebase";
import { useRouter, useRoute } from "vue-router";
import InputTextArea from "@/components/forms/InputTextArea";
import InputRadio from "@/components/forms/InputRadio";
import InputCheck from "@/components/forms/InputCheck";
import InputMood from "@/components/forms/InputMood";
import ButtonLight from "@/components/forms/ButtonLight";
import ButtonPrimary from "@/components/forms/ButtonPrimary";

const db = getFirestore(fb);
const route = useRoute();
const currentRoute = route.params.id;
const router = useRouter();
const errorMessage = ref();
const responses = ref([]);
const currentResponse = ref(null);

const state = reactive({
  survey: null,
  responses: null,
  currentQuestion: 0,
  responseForm: {
    questions: [],
  },
});

const incrementQuestion = async (question, response) => {
  errorMessage.value = "";

  if (!response || response === "" || response === []) {
    errorMessage.value = "Please make a selection.";
    return;
  }

  const existingIndex = responses.value.findIndex(
    (entry) => entry.questionIndex === question.questionIndex
  );

  if (existingIndex !== -1) {
    // Update the existing entry
    responses.value[existingIndex].response = response;
  } else {
    // Push a new entry
    responses.value.push([
      question.questionIndex,
      question.title,
      question.type,
      response,
    ]);
  }

  state.currentQuestion++;

  if (state.currentQuestion === state.survey.questions.length) {
    submitResponse(question, response);
  }
};

const decrementQuestion = () => {
  if (state.currentQuestion > 0) {
    errorMessage.value = "";
    state.currentQuestion--;
  }
};

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const submitResponse = async () => {
  const currentRoute = route.params.id;
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const timeObj = new Date();
  const hours = String(timeObj.getHours()).padStart(2, "0");
  const minutes = String(timeObj.getMinutes()).padStart(2, "0");
  const seconds = String(timeObj.getSeconds()).padStart(2, "0");
  const responseSubmission = [
    state.survey.title,
    state.survey.creator,
    state.survey.description,
    `${year}-${month}-${day}`, // Use dashes (-) to separate year, month, and day
    `${hours}:${minutes}:${seconds}`,
    responses,
  ];
  
  const docRef = doc(db, "surveys", currentRoute);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Add responseSubmission to the 'responses' array field in the document
    await updateDoc(docRef, {
      responses: responseSubmission
    });

    fetchData(); // Assuming this function fetches and updates the survey data
  } else {
    errorMessage ="Survey document does not exist!";
  }
};

onMounted(() => {
  const docRef = doc(db, "surveys", currentRoute);
  try {
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        state.survey = { ...doc.data(), id: doc.id };
        state.responses = state.survey;
        document.title = state.survey.title;
        // Re-route if inactive survey
        if (state.survey.status == "inactive") {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    });
  } catch (error) {
    router.push("/");
  }
});
</script>
