<template>
  <div class="flex flex-col md:flex-row" v-if="state.survey">
    <aside
      class="w-full md:max-w-[360px] md:min-w-[360px] bg-white md:border-r shadow-lg">
      <div
        class="h-full p-5 md:p-10 md:pt-32 overflow-y-auto bg-white flex flex-col justify-between">
        <div class="w-ful flex flex-col gap-y-4">
          <div class="font-semibold">
            {{ state.survey.creator ?? "🧙‍♂️ FeedbackWizard" }}
          </div>
          <div class="font-bold text-3xl">
            {{ state.survey.title }}
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
            v-if="!errorMessage"
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
                  state.survey.questions[state.currentQuestion].title,
                  state.survey.questions[state.currentQuestion].type,
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
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
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

const state = reactive({
  survey: null,
  responses: null,
  currentQuestion: 0,
  responseForm: {
    questions: [
      {
        title: "",
        type: "",
        response: "",
        options: "",
      },
    ],
  },
});

const incrementQuestion = (title, type, question) => {
  const modelValue = state.responseForm.questions[state.currentQuestion];
  console.log("Model value:", modelValue);
  state.currentQuestion++;
};

const decrementQuestion = () => {
  if (state.currentQuestion > 0) {
    state.currentQuestion--;
  }
};

const submitResponse = () => {};

onMounted(() => {
  const docRef = doc(db, "surveys", currentRoute);
  try {
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        state.survey = { ...doc.data(), id: doc.id };
        state.responses = state.survey;
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
