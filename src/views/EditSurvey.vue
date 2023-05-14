<template>
  <div>
    <Navbar></Navbar>
    <EditQuestion 
    v-if="state.editQuestionModal"
    @editQuestionModal="editQuestionModal()"
    ></EditQuestion>
    <DeleteSurveyModal
      v-if="state.deleteSurveyModal"
      @deleteSurveyModal="deleteSurveyModal()"
      @deleteSurvey="deleteSurvey(state.survey.id)"
    ></DeleteSurveyModal>
    <div class="bg-white border-b drop-shadow">
      <div
        class="w-full max-w-6xl mx-auto p-5 md:p-10 flex flex-col items-start justify-start gap-y-4"
      >
        <div
          v-if="state.survey.status == 'active'"
          class="w-auto py-2 px-3 rounded-lg font-semibold text-xs bg-lime-200 text-lime-800 capitalize animate-pulse"
        >
          {{ state.survey.status }}
        </div>
        <div
          v-if="state.survey.status == 'inactive'"
          class="w-auto py-2 px-3 rounded-lg font-semibold text-xs bg-red-100 text-red-600 capitalize animate-pulse"
        >
          {{ state.survey.status }}
        </div>
        <div class="block font-semibold text-2xl text-gray-700">
          {{ state.survey.title }}
        </div>
        <div class="text-sm text-gray-400">
          {{ state.survey.description }}
        </div>
        <div class="w-full flex flex-row gap-x-4">
          <button
            @click="deleteSurveyModal(state.survey.id)"
            class="bg-red-100 border border-red-200 hover:bg-red-200 hover:border-red-300 text-red-600 hover:text-red-700 font-medium py-3 px-5 rounded-lg"
          >
            <i class="ri-delete-bin-line"></i>
          </button>
          <button
            @click="copyTextToClipboard()"
            class="bg-gray-50 border hover:bg-white text-gray-600 text-sm font-medium py-3 pl-6 pr-14 rounded-lg relative truncate"
          >
            https://loremipsum.com/{{ state.survey.id }}
            <i
              class="font-semibold ml-4 ri-file-copy-line absolute right-[24px]"
            ></i>
          </button>
        </div>
      </div>
    </div>
    <div class="w-full max-w-6xl flex flex-col gap-y-4 p-5 md:p-10 mx-auto">
      <div
        v-if="state.survey.questions?.length > 0"
        class="block font-semibold text-2xl"
      >
        Questions ({{ state.survey.questions?.length ?? 0 }})
      </div>
      <div
        v-if="state.survey.questions?.length <= 0"
        class="max-w-xl mx-auto text-center font-semibold text-xl text-gray-700"
      >
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
        class="bg-white drop-shadow-md rounded-lg py-8 px-8 flex flex-col md:flex-row gap-y-4 items-start justify-between"
      >
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
          <div
            class="bg-gray-50 border hover:bg-white text-gray-600 font-medium py-2 px-6 rounded-lg cursor-pointer"
          >
            Edit
          </div>
        </div>
      </div>
      <button
        @click="editQuestionModal()"
        class="w-auto mx-auto bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-8 rounded-lg drop-shadow hover:drop-shadow-lg"
      >
        Add new question
      </button>
      <div
        v-if="state.survey.questions?.length > 0"
        class="flex flex-row gap-x-4"
      >
        <button
          class="bg-gray-50 border hover:bg-white text-gray-600 font-medium py-3 px-7 rounded-lg"
        >
          Cancel
        </button>
        <button
          @click="updateSurvey()"
          class="bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-3 px-8 rounded-lg drop-shadow hover:drop-shadow-lg"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
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
import Navbar from "@/components/Navbar.vue";
import InputText from "@/components/forms/InputText";
import InputRadio from "@/components/forms/InputRadio";
import EditQuestion from "@/components/modals/EditQuestion";
import DeleteSurveyModal from "@/components/modals/DeleteSurvey.vue";

const state = reactive({
  surveyList: [],
  survey: {},
  editQuestionModal: false,
  deleteSurveyModal: false,
});

const db = getFirestore(fb);
const fbRef = collection(db, "surveys");
const route = useRoute();
const currentRoute = route.params.id;
const router = useRouter();

const fetchData = async () => {
  const fbDocs = await getDocs(fbRef);
  const docdata = fbDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  state.surveyList = docdata;
};

const copyTextToClipboard = () => {
  navigator.clipboard
    .writeText(textToCopy.value)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Error copying text to clipboard: ", err);
    });
};

const updateSurvey = async () => {
  const docRef = doc(db, "surveys", currentRoute);
  try {
    await updateDoc(docRef, { pageCount: 1000 });
    fetchData();
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

const editQuestionModal = () => {
  state.editQuestionModal = !state.editQuestionModal;
};

const deleteSurveyModal = () => {
  state.deleteSurveyModal = !state.deleteSurveyModal;
};

const deleteSurvey = async (id) => {
  const docRef = doc(db, "surveys", id);
  await deleteDoc(docRef);
  state.deleteSurveyModal == false;
  router.push('/dashboard');
};

onMounted(() => {
  fetchData();
  const docRef = doc(db, "surveys", currentRoute);
  onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      state.survey = { ...doc.data(), id: doc.id };
    } else {
      router.push('/dashboard');
    }
  });
});
</script>
