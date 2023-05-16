<template>
  <div class="flex flex-col md:flex-row" v-if="state.survey">
    <aside
      class="w-full md:max-w-[360px] md:min-w-[360px] bg-white md:border-r drop-shadow-lg">
      <div
        class="h-full p-5 md:p-10 md:pt-32 overflow-y-auto bg-white flex flex-col justify-between">
        <div class="w-ful flex flex-col gap-y-4">
          <div class="font-semibold">{{ state.survey.creator ?? '🧙‍♂️ FeedbackWizard'}}</div>
          <div class="font-bold text-3xl">
            {{ state.survey.title }}
          </div>
          <div class="text-gray-400">
            {{ state.survey.description }}
          </div>
        </div>
        <router-link to="/" class="hidden md:block text-gray-400 hover:text-cyan-500 text-base cursor-pointer mt-4">
          Made&nbsp;with&nbsp;<span class="font-medium">🧙‍♂️&nbsp;FeedbackWizard</span>
        </router-link>
      </div>
    </aside>
    <div class="w-full h-full md:min-h-screen bg-gray-50">
      <div class="md:py-32 p-5 md:p-10" v-if="state.survey.questions">
        <!-- Feedback Complete -->
        <div
          v-if="state.currentQuestion >= state.survey.questions.length"
          class="w-full max-w-[400px] mx-auto flex flex-col items-center justify-center gap-y-4 text-center"
        >
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
          class="w-full max-w-3xl mx-auto flex flex-col items-stretch justify-start gap-y-4"
        >
          <div class="font-semibold text-slate-400">
            Question&nbsp;{{ state.currentQuestion + 1 }} of
            {{ state.survey.questions.length }}
          </div>
          <div class="block font-semibold text-2xl text-gray-700">
            {{ state.survey.questions[state.currentQuestion].title }}
          </div>
          <!-- Single Choice Question -->
          <div class="flex flex-col min-h-[144px] my-2" v-if="state.survey.questions[state.currentQuestion].type === 'single'">
            <div
              v-for="(option, index) in state.survey.questions[state.currentQuestion].options"
              :key="option">
              <InputRadio
                name="questionType"
                :tabindex="index + 1"
                :description="option"
              ></InputRadio>
            </div>
          </div>
          <!-- Multiple Choice Question -->
          <div class="flex flex-col gap-y-4 min-h-[144px] my-2" v-if="state.survey.questions[state.currentQuestion].type === 'multiple'">
            <div
              v-for="(option, index) in state.survey.questions[state.currentQuestion].options"
              :key="option">
              <InputCheck
                name="questionType"
                id="single"
                :description="option"
              ></InputCheck>
            </div>
          </div>
          <!-- Text Question -->
          <div
            class="min-h-[144px] my-2"
            v-if="state.survey.questions[state.currentQuestion].type === 'text'"
          >
            <InputTextArea
              id="message"
              rows="5"
              class="block p-2.5 w-full drop-shadow text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:drop-shadow-lg"
              placeholder="Write your thoughts here..."
            ></InputTextArea>
          </div>
          <!-- Continue / Back Buttons -->
          <div class="flex flex-row items-stretch justify-start gap-4">
            <button
            tabindex="-1"
              v-if="state.currentQuestion > 0"
              v-on:click="decrementQuestion()"
              class="bg-gray-300 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg"
            >
              Back
            </button>
            <button
              :tabindex="(state.survey.questions[state.currentQuestion].options?.length + 1)"
              v-on:click="incrementQuestion()"
              class="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-6 rounded-lg drop-shadow hover:drop-shadow-lg"
            >
              Continue
            </button>
          </div>
        </div>
        <router-link to="/" class="block md:hidden text-gray-400 hover:text-cyan-500 text-base cursor-pointer mt-24">
          Made&nbsp;with&nbsp;<span class="font-medium">🧙‍♂️&nbsp;FeedbackWizard</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import {
  getFirestore,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { fb } from "@/plugins/firebase";
import { useRouter, useRoute } from "vue-router";
import InputTextArea from "@/components/forms/InputTextArea";
import InputRadio from "@/components/forms/InputRadio";
import InputCheck from "@/components/forms/InputCheck";

const state = reactive({
  survey: null,
  currentQuestion: 0,
});

const incrementQuestion = () => {
  state.currentQuestion++;
};

const decrementQuestion = () => {
  if (state.currentQuestion > 0) {
    state.currentQuestion--;
  }
};
const db = getFirestore(fb);
const route = useRoute();
const currentRoute = route.params.id;
const router = useRouter();

onMounted(() => {
  const docRef = doc(db, "surveys", currentRoute);
  try {
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        state.survey = { ...doc.data(), id: doc.id };
        document.title =  state.survey.title
        console.log(state.survey.questions[state.currentQuestion])
        if (state.survey.status == 'inactive') {
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
