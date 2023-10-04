<template>
  <div class="flex flex-col md:flex-row" v-if="state.survey">
    <aside
      class="bg-white border-b md:border-b-0 md:border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 w-full md:max-w-[360px] md:min-w-[360px] shadow md:shadow-lg relative">
      <div
        class="h-full p-5 md:p-10 md:pt-32 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
        <div class="w-ful flex flex-col gap-y-4">
          <div v-if="state.survey.creator" class="font-semibold select-none text-gray-700 dark:text-gray-400">
            {{ state.survey.creator ?? "🧙‍♂️ FeedbackWizard" }}
          </div>
          <hr class="block md:hidden -mx-[20px] border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700" />
          <div class="font-bold text-3xl text-gray-900 dark:text-white">
            {{ state.survey.title ?? "Survey" }}
          </div>
          <div class="text-gray-700 dark:text-gray-400">
            {{ state.survey.description }}
          </div>
        </div>
        <router-link
          to="/"
          class="hidden md:block text-gray-700 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-700 text-base cursor-pointer mt-4">
          Made&nbsp;with&nbsp;<span class="font-medium"
            >🧙‍♂️&nbsp;FeedbackWizard</span
          >
        </router-link>
      </div>
    </aside>
    <div class="w-full h-full md:min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="md:py-32 p-5 md:p-10" v-if="state.survey.questions">
        <!-- Feedback Complete -->
        <div
          v-if="state.currentQuestion >= state.survey.questions.length"
          class="w-full max-w-[400px] mx-auto flex flex-col items-center justify-center gap-y-4 text-center">
          <i class="ri-checkbox-circle-fill text-5xl text-blue-600"></i>
          <div class="font-bold text-3xl text-gray-900 dark:text-white">
            Survey complete!
          </div>
          <div class="font-semibold text-gray-700 dark:text-gray-400">
            Thank you for taking part in our survey. You may now close this window.
          </div>
        </div>
        <!-- Feedback Survey -->
        <div
          v-if="state.currentQuestion + 1 <= state.survey.questions.length"
          class="w-full max-w-3xl mx-auto flex flex-col items-stretch justify-start gap-y-4">
          <div class="block text-gray-700 dark:text-gray-400 font-medium">
            Question&nbsp;{{ state.currentQuestion + 1 }} of
            {{ state.survey.questions.length }}
          </div>
          <div class="block font-semibold text-2xl text-gray-900 dark:text-white">
            {{ state.survey.questions[state.currentQuestion].title }}
          </div>
          <div class="text-gray-700 dark:text-gray-400 text-xs" v-if="
              state.survey.questions[state.currentQuestion].type === 'single' || state.survey.questions[state.currentQuestion].type === 'mood'
            ">(select one answer)
          </div>
          <div class="text-gray-700 dark:text-gray-400 text-xs" v-if="
              state.survey.questions[state.currentQuestion].type === 'multiple'
            ">(select one or more answers)
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
              v-if="state.survey.showBackButton && state.currentQuestion > 0"
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
          class="block md:hidden text-sm text-gray-700 dark:text-gray-400 hover:bg-blue-800 dark:hover:bg-blue-700 cursor-pointer mt-24">
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
  userResponses: [], 
});

const incrementQuestion = async (question, response) => {
  errorMessage.value = "";

  if (!response || response === "" || response === []) {
    errorMessage.value = "Please make a selection.";
    return;
  }

  const existingIndex = state.userResponses.findIndex(
    (entry) => entry.questionIndex === question.questionIndex
  );

  if (existingIndex !== -1) {
    // Update the existing entry
    state.userResponses[existingIndex].response = response;
  } else {
    // Push a new entry
    state.userResponses.push({
      questionIndex: question.questionIndex,
      questionTitle: question.title,
      responseType: question.type,
      response: response,
    });
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

const submitResponse = async () => {
  const currentRoute = route.params.id;
  const surveyCollectionRef = doc(db, "surveys", currentRoute);
  const responseSubmission = {
    surveyTitle: state.survey.title,
    surveyCreator: state.survey.creator,
    surveyDescription: state.survey.description,
    responseDate: new Date(),
    userResponses: state.userResponses, // Use state.userResponses here
  };

  try {
    const docSnapshot = await getDoc(surveyCollectionRef);

    if (docSnapshot.exists()) {
      // Update the document with the new response
      await updateDoc(surveyCollectionRef, {
        responses: [...(docSnapshot.data().responses || []), responseSubmission],
      });
    } else {
      console.log('Document does not exist!');
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

onMounted(() => {
  const surveyCollectionRef = doc(db, "surveys", currentRoute);
  const hasUpdatedViews = ref(false); // Add this flag
  try {
    onSnapshot(surveyCollectionRef, (doc) => {
      if (doc.exists()) {
        state.survey = { ...doc.data(), id: doc.id };
        state.responses = state.survey;
        document.title = state.survey.title;

        // Re-route if inactive survey
        if (state.survey.status == "inactive") {
          router.push("/");
          return;
        }

        // Update the survey with a new view only if it hasn't been updated before
        if (!hasUpdatedViews.value) {
          updateSurveyViews(surveyCollectionRef);

          // Set the flag to true so that we don't update the views again
          hasUpdatedViews.value = true;
        }
      } else {
        router.push("/");
      }
    });
  } catch (error) {
    router.push("/");
  }
});

// Define a function to update the "views" field
const updateSurveyViews = async (surveyCollectionRef) => {
  try {
    // Get the current views array from the document
    const surveyCollectionSnapshot = await getDoc(surveyCollectionRef);
    if (surveyCollectionSnapshot.exists()) {
      const currentViewsArray = surveyCollectionSnapshot.data().views || [];

      // Get the current datetime
      const dateObj = new Date();
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
      const seconds = String(dateObj.getSeconds()).padStart(2, "0");
      const currentDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      // Push the current datetime into the views array
      currentViewsArray.push(currentDatetime);

      // Update the document with the new views array
      await updateDoc(surveyCollectionRef, { views: currentViewsArray });
    }
  } catch (error) {
    console.error("Error updating survey views:", error);
  }
};

</script>
