<template>
  <div>
    <transition name="slide">
      <Toast v-if="showToast"></Toast>
    </transition>

    <Navbar></Navbar>
    <DeleteSurveyModal
      v-if="state.deleteSurveyModal"
      @deleteSurveyModal="deleteSurveyModal()"
      @deleteSurvey="deleteSurvey(state.survey.id)"></DeleteSurveyModal>
    <div class="bg-white border-b shadow">
      <div
        class="w-full max-w-6xl mx-auto p-5 md:p-10 flex flex-col items-start justify-start gap-y-4">
        <div class="font-semibold text-3xl">
          {{ state.survey.title }}
        </div>
        <div
          v-if="state.survey.creator"
          class="text-sm font-semibold text-gray-700">
          {{ state.survey.creator }}
        </div>
        <div v-if="state.survey.description" class="text-gray-500">
          {{ state.survey.description }}
        </div>
        <div class="w-full flex flex-row gap-x-4">
          <ButtonDanger @click="deleteSurveyModal(state.survey.id)"
            >Delete survey</ButtonDanger
          >
          <ButtonLight
            v-if="state.survey.status == 'active'"
            @click="
              copyTextToClipboard(location + publicPath + state.survey.id)
            "
            ><span>{{ location + publicPath + state.survey.id }}</span
            ><i class="ri-external-link-line"></i
          ></ButtonLight>
        </div>
        <hr class="w-full" />
        <div class="w-full flex flex-row gap-x-4">
          <div class="space-y-1">
            <div class="font-medium text-xs text-gray-500">Status</div>
            <SurveyStatus :status="state.survey.status"></SurveyStatus>
          </div>
          <div v-if="state.survey.creationDate" class="space-y-1">
            <div class="font-medium text-xs text-gray-500">Created</div>
            <div
              class="w-auto py-2 px-3 rounded-lg font-semibold text-sm text-gray-600 bg-gray-100 capitalize">
              {{ formatDate(state.survey.creationDate) }}
            </div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-xs text-gray-500">Last Update</div>
            <div
              class="w-auto py-2 px-3 rounded-lg font-semibold text-sm text-gray-600 bg-gray-100 capitalize">
              {{ formatDate(state.survey.creationDate) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full max-w-6xl flex flex-col gap-y-4 p-5 md:p-10 mx-auto">
      <div
        v-if="state.survey.questions?.length > 0"
        class="block font-semibold text-2xl">
        Questions ({{ state.survey.questions?.length ?? 0 }})
      </div>
      <div
        v-if="state.survey.questions?.length <= 0"
        class="max-w-xl mx-auto text-center font-semibold text-xl text-gray-700">
        Ready to start building your survey?
      </div>
      <div
        v-if="state.survey.questions?.length <= 0"
        class="max-w-xl mx-auto text-center text-sm text-gray-500">
        Your survey is a blank canvas, waiting for you to bring it to life with
        your questions. You're just a click away! Add your first question now.
      </div>
      <div
        v-for="(question, questionIndex) in state.survey.questions"
        :key="question"
        class="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-y-4 items-start justify-between">
        <div class="w-full flex flex-col items-start justify-start gap-y-2">
          <div class="w-full flex flex-col gap-y-4 text-gray-700">
            <div class="block font-semibold text-xl">
              {{ question.title }}
            </div>
            <div class="flex flex-row items-start justify-start gap-2">
              <div
                class="w-auto py-2 px-3 rounded-lg font-semibold text-sm text-gray-600 bg-gray-100 capitalize">
                {{ question.type }}&nbsp;choice
              </div>
              <div
                v-if="question.type != 'text'"
                class="w-auto py-2 px-3 rounded-lg font-semibold text-sm text-gray-600 bg-gray-100">
                {{ question.options?.length }}&nbsp;options
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-start gap-2 md:ml-4">
          <ButtonLight @click="editQuestion(questionIndex)">
            <span>Edit</span><i class="ri-pencil-line"></i>
          </ButtonLight>
          <ButtonDanger @click="deleteQuestion(questionIndex)">
            <i class="ri-delete-bin-line"></i>
          </ButtonDanger>
        </div>
      </div>
      <ButtonLight
      :class="{ 'mx-auto mr-auto ml-auto': state.survey.questions?.length <= 0}"
        class="w-auto ml-auto"
        @click="addNewQuestion(state.survey.id)"
        ><span>add&nbsp;question</span><i class="ri-add-line font-semibold"></i
      ></ButtonLight>
    </div>
    <Modal v-if="showModal" @close="showModal = false">
      <InputText
        label="Question Title"
        v-model="state.tempForm.title"
        placeholder="Question Title" />
      <div>
        <label class="block text-gray-500 font-medium mb-2"
          >Question Type</label
        >
        <div class="relative">
          <select
            v-model="state.tempForm.type"
            class="cursor-pointer appearance-none bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block shadow w-full py-3 pl-4 pr-8">
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
            <option value="text">Text Response</option>
            <option value="mood">Mood Scale</option>
          </select>
          <i
            class="ri-arrow-down-s-fill absolute right-3 top-3 pointer-events-none"></i>
        </div>
      </div>
      <div
        v-if="
          state.tempForm.type == 'single' || state.tempForm.type == 'multiple'
        "
        class="space-y-2">
        <label class="block text-gray-500 font-medium">Options</label>
        <div
          class="w-full flex flex-row gap-2 items-center"
          v-for="(option, optionIndex) in state.tempForm.options"
          v-bind:key="optionIndex">
          <InputText
            label=""
            v-model="state.tempForm.options[optionIndex]"
            placeholder="Enter your response here..." />
          <button
            v-if="state.tempForm.options.length > 1"
            @click="deleteOption(optionIndex)"
            type="button"
            class="text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm p-1.5 flex items-center">
            <i class="ri-close-circle-line text-2xl h-8 w-8"></i>
            <span class="sr-only">Delete question</span>
          </button>
        </div>
        <ButtonLight
          class="text-sm"
          @click="
            () => {
              return addOption();
            }
          "
          ><span>add&nbsp;option</span><i class="ri-add-line font-semibold"></i
        ></ButtonLight>
      </div>
      <!-- Text 
      <div v-if="state.tempForm.type == 'text'"
      class="space-y-2">
        <InputText
          label="Text Field Placeholder"
          v-model="state.tempForm.options[0]"
          :placeholder="state.tempForm.options[0]" />
      </div>-->
      <div
        v-if="errorMessage"
        class="block text-center text-red-600 font-semibold">
        {{ errorMessage }}
      </div>
      <div
        v-if="state.tempForm.type == 'mood'"
        class="space-y-2">
        <label class="block text-gray-500 font-medium">Options</label>
        <div
          class="w-full flex flex-row gap-2 items-center relative"
          v-for="(option, optionIndex) in 5"
          v-bind:key="optionIndex">
          <div class="text-2xl h-10 w-10 min-w-10 -ml-1 mr-2 flex items-center justify-center">
            {{ emoji[optionIndex] }}
          </div>
          <InputText
            label=""
            class=""
            v-model="state.tempForm.options[optionIndex]"
            placeholder="Enter your response here..." />
        </div>
      </div>
      <ButtonPrimary @click="saveQuestion()" class="w-full">Save Question</ButtonPrimary>
    </Modal>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { fb } from "@/plugins/firebase";
import { useRouter, useRoute } from "vue-router";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
import SurveyStatus from "@/components/SurveyStatus";
import InputText from "@/components/forms/InputText";
import Modal from "@/components/modals/Modal";
import DeleteSurveyModal from "@/components/modals/DeleteSurvey";
import ButtonPrimary from "@/components/forms/ButtonPrimary";
import ButtonDanger from "@/components/forms/ButtonDanger";
import ButtonLight from "@/components/forms/ButtonLight";

const state = reactive({
  surveyList: [],
  survey: {},
  deleteSurveyModal: false,
  tempForm: {},
});

const db = getFirestore(fb);
const fbRef = collection(db, "surveys");
const route = useRoute();
const currentRoute = route.params.id;
const router = useRouter();
const location = window.location.origin;
const publicPath = process.env.VUE_APP_PUBLIC_PATH;
const showModal = ref(false);
const showToast = ref(false);
const errorMessage = ref("");
const emoji = ref(['😍','😃','🙂','😐','🙁'])

const fetchData = async () => {
  const fbDocs = await getDocs(fbRef);
  const docdata = fbDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  state.surveyList = docdata;
};

const copyTextToClipboard = (value) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
      //showToast(`Copied "${value}" to clipboard!`);
    })
    .catch((error) => {
      console.error(`Error copying "${value}" to clipboard: ${error}`);
    });
};

const addNewQuestion = async (surveyID) => {
  const docRef = doc(db, "surveys", surveyID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const surveyData = docSnap.data();
    const maxIndex = surveyData.questions.length;
    const updatedQuestions = [
      ...surveyData.questions,
      {
        title: "Question " + (maxIndex + 1),
        type: "single",
        options: ["Option"],
      },
    ];

    await updateDoc(docRef, { questions: updatedQuestions });

    console.log("Question added successfully!");
  } else {
    console.log("Survey does not exist.");
  }
};

const editQuestion = async (questionIndex) => {
  state.tempForm.questionIndex = await questionIndex;
  state.tempForm.questionIndex = await questionIndex;
  state.tempForm.title = await state.survey.questions[questionIndex].title;
  state.tempForm.type = await state.survey.questions[questionIndex].type;
  state.tempForm.options = await state.survey.questions[questionIndex].options;
  errorMessage.value = ""
  showModal.value = true;
};

const saveQuestion = async () => {
  console.log(state.tempForm);

  if (state.tempForm.title.trim() === "") {
    errorMessage.value = "Uh-oh, all fields are required!";
    return;
  }

  if (state.tempForm.type.trim() === "") {
    errorMessage.value = "Uh-oh, all fields are required!";
    return;
  }

  if (state.tempForm.options.every(option => option.trim() !== "")) {
    // All entries are not empty strings
  } else {
    errorMessage.value = "Uh-oh, all fields are required!";
    return;
  }


  try {
    const docRef = doc(db, "surveys", currentRoute);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.error("Document does not exist.");
      return;
    }

    const docData = docSnapshot.data();
    const updatedQuestions = [...docData.questions];

    if (updatedQuestions.length <= state.tempForm.questionIndex) {
      console.error("Invalid question index.");
      return;
    }

    updatedQuestions[state.tempForm.questionIndex] = state.tempForm;
    showModal.value = false;
    await updateDoc(docRef, { questions: updatedQuestions });
    fetchData();
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

const deleteQuestion = async (questionIndex) => {
  const docRef = doc(db, "surveys", state.survey.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const surveyData = docSnap.data();
    const updatedQuestions = surveyData.questions.filter(
      (_, index) => index !== questionIndex
    );

    await updateDoc(docRef, { questions: updatedQuestions });
    fetchData();
  } else {
    console.log("Survey document does not exist!");
  }
};


const addOption = () => {
  state.tempForm.options.push("");
};

const deleteOption = (optionIndex) => {
  state.tempForm.options.splice(optionIndex, 1);
};

const deleteSurveyModal = () => {
  state.deleteSurveyModal = !state.deleteSurveyModal;
};

const deleteSurvey = async (id) => {
  const docRef = doc(db, "surveys", id);
  await deleteDoc(docRef);
  state.deleteSurveyModal == false;
  router.push("/dashboard");
};

const formatDate = (dateString) => {
  if (typeof dateString !== "string" || dateString.length !== 8) {
    console.error("Invalid date format.");
    return null;
  }

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

onMounted(() => {
  fetchData();
  const docRef = doc(db, "surveys", currentRoute);
  onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      state.survey = { ...doc.data(), id: doc.id };
    } else {
      router.push("/dashboard");
    }
  });
});
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #48bb78;
}
</style>
