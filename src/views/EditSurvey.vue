<template>
  <div>
    <Navbar></Navbar>
    <DeleteSurveyModal
      v-if="state.deleteSurveyModal"
      @deleteSurveyModal="deleteSurveyModal()"
      @deleteSurvey="deleteSurvey(state.survey.id)"></DeleteSurveyModal>
    <div class="bg-white border-b drop-shadow">
      <div
        class="w-full max-w-6xl mx-auto p-5 md:p-10 flex flex-col items-start justify-start gap-y-4">
        <div
          v-if="state.survey.status == 'active'"
          class="w-auto py-2 px-3 rounded-lg font-semibold text-xs bg-lime-200 text-lime-800 capitalize animate-pulse">
          {{ state.survey.status }}
        </div>
        <div
          v-if="state.survey.status == 'inactive'"
          class="w-auto py-2 px-3 rounded-lg font-semibold text-xs bg-red-100 text-red-600 capitalize animate-pulse">
          {{ state.survey.status }}
        </div>
        <div class="text-sm font-semibold text-gray-400">
          {{ state.survey.creator }}
        </div>
        <div class="font-semibold text-3xl">
          {{ state.survey.title }}
        </div>
        <div class="text-sm text-gray-400">
          {{ state.survey.description }}
        </div>
        <div class="w-full flex flex-row gap-x-4">
          <button
            @click="deleteSurveyModal(state.survey.id)"
            class="bg-red-100 border border-red-200 hover:bg-red-200 hover:border-red-300 text-red-600 hover:text-red-700 font-medium py-3 px-5 rounded-lg">
            <i class="ri-delete-bin-line"></i>
          </button>
          <button
            @click="copyTextToClipboard(location + publicPath + state.survey.id)"
            class="bg-gray-50 border hover:bg-white text-gray-600 font-medium rounded-lg py-3 pl-6 pr-14 relative truncate">
            {{ location + publicPath + state.survey.id }}
            <i
              class="font-semibold ml-4 ri-file-copy-line absolute right-[24px]"></i>
          </button>
        </div>
        <div class="w-full flex flex-row gap-x-4">
          <div class="space-y-1">
            <div class="font-semibold text-xs text-gray-400">Date Created</div>
            <div
              class="w-auto py-2 px-3 rounded-lg font-semibold text-sm bg-gray-100 text-gray-600 capitalize">
              {{ state.survey.creationDate }}
            </div>
          </div>
          <div class="space-y-1">
            <div class="font-semibold text-xs text-gray-400">Last Update</div>
            <div
              class="w-auto py-2 px-3 rounded-lg font-semibold text-sm bg-gray-100 text-gray-600 capitalize">
              {{ state.survey.creationDate }}
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
        class="max-w-xl mx-auto text-center text-sm text-gray-400">
        Your survey is a blank canvas, waiting for you to bring it to life with
        your questions. You're just a click away! Add your first question now.
      </div>
      <div
        v-for="(question, index) in state.survey.questions"
        :key="question"
        class="bg-white drop-shadow-md rounded-lg py-8 px-8 flex flex-col md:flex-row gap-y-4 items-start justify-between">
        <div class="flex flex-col items-start justify-start gap-y-2">
          <div class="w-full flex flex-col gap-y-2 text-gray-700">
            <div class="block font-semibold text-xl">
              {{ question.title }}
            </div>
            <div class="text-sm text-gray-400 capitalize">
              {{ question.type }}
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-2 md:ml-4">
          <button
            @click="
              () => {
                showModal = true;
                return editQuestion(index);
              }
            "
            class="bg-gray-50 border hover:bg-white text-gray-600 font-medium py-2 px-6 rounded-lg cursor-pointer">
            Edit
          </button>
        </div>
      </div>
      <button
        class="w-auto mx-auto bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-8 md:mt-5 rounded-lg drop-shadow hover:drop-shadow-lg">
        Add new question
      </button>
    </div>
    <Modal v-if="showModal" @close="showModal = false">
      <InputText
        type="text"
        label="Question Title"
        :model="tempQuestion.title"
        :value="tempQuestion.title"
        placeholder="Question Title" />
      <div class="flex flex-col gap-y-0">
        <label class="block text-gray-500 font-medium mb-2">Question Type</label>
        <InputRadio
          label="Single Choice"
          name="questionType"
          :model="tempQuestion.type"
          value="single"
          :tabindex="1 + 1"></InputRadio>
        <InputRadio
          label="Multiple Choice"
          name="questionType"
          :model="tempQuestion.type"
          value="multiple"
          :tabindex="1 + 1"></InputRadio>
        <InputRadio
          label="Text Input"
          name="questionType"
          :model="tempQuestion.type"
          value="text"
          :tabindex="1 + 1"></InputRadio>
      </div>
      <!-- Radio -->
      <div v-if="tempQuestion.type == 'single' || tempQuestion.type == 'multiple'" >
        <label class="block text-gray-500 font-medium mb-2">Answers</label>
        <InputText
          class="mb-2"
          v-for="(option, index) in tempQuestion.options"
          v-bind:key="index"
          type="text"
          label=""
          :model="option"
          placeholder="Question Title" />
      </div>
      <button
        class="w-full mx-auto bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-8 md:mt-5 rounded-lg drop-shadow hover:drop-shadow-lg"
        @click="
          () => {
            showModal = false;
            return saveQuestion();
          }
        ">
        Save Question
      </button>
    </Modal>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { fb } from "@/plugins/firebase";
import { useRouter, useRoute } from "vue-router";
import Navbar from "@/components/Navbar";
import InputText from "@/components/forms/InputText";
import InputRadio from "@/components/forms/InputRadio";
import Modal from "@/components/modals/Modal";
import DeleteSurveyModal from "@/components/modals/DeleteSurvey";

const state = reactive({
  surveyList: [],
  survey: {},
  deleteSurveyModal: false,
});

const db = getFirestore(fb);
const fbRef = collection(db, "surveys");
const route = useRoute();
const currentRoute = route.params.id;
const router = useRouter();
const location = window.location.origin;
const publicPath = process.env.VUE_APP_PUBLIC_PATH;
const showModal = ref(false);
const tempQuestion = ref({
  questionTitle: "",
  questionType: "",
  pageCount: "222",
});

const fetchData = async () => {
  const fbDocs = await getDocs(fbRef);
  const docdata = fbDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  state.surveyList = docdata;
};

const copyTextToClipboard = (value) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      console.log(`Copied "${value}" to clipboard`);
    })
    .catch((error) => {
      console.error(`Error copying "${value}" to clipboard: ${error}`);
    });
};

const editQuestion = (index) => {
  tempQuestion.value = state.survey.questions[index];
};

const saveQuestion = (index) => {
  console.log(tempQuestion)
}

const updateSurvey = async () => {
  const docRef = doc(db, "surveys", currentRoute);
  try {
      await updateDoc(docRef, { ...nav });
      const docRef = doc(db, "surveys", nav.id);
    await updateDoc(docRef, { pageCount: 1000 });
    fetchData();
  } catch (error) {
    console.error("Error updating document: ", error);
  }
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
