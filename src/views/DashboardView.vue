<template>
  <div>
    <Navbar></Navbar>
    <div
      class="w-full max-w-6xl mx-auto p-5 pt-10 md:p-10 flex flex-col gap-y-10">
      <div class="w-full flex flex-col gap-y-4">
        <div class="font-semibold text-3xl">Dashboard</div>
        <div class="flex flex-col md:flex-row gap-4 justify-stretch">
          <div
            class="w-full bg-white shadow-md rounded-lg p-6 flex flex-grow flex-col gap-4 items-start justify-center">
            <div class="text-sm text-gray-500">Surveys created this month</div>
            <div class="font-bold text-5xl">
              {{ getSurveysCreatedThisMonth(state.surveyList) }}
            </div>
          </div>
          <div
            class="w-full bg-white shadow-md rounded-lg p-6 flex flex-grow flex-col gap-4 items-start justify-center">
            <div class="text-sm text-gray-500">Survey views this month</div>
            <div class="font-bold text-5xl">0</div>
          </div>
          <div
            class="w-full bg-white shadow-md rounded-lg p-6 flex flex-grow flex-col gap-4 items-start justify-center">
            <div class="text-sm text-gray-500">Survey responses this month</div>
            <div class="font-bold text-5xl">0</div>
          </div>
          <div
            class="w-full bg-white shadow-md rounded-lg p-4 flex flex-grow flex-col items-center justify-center text-center">
            <div class="block font-semibold text-xl mb-1">Get feedback</div>
            <div class="text-xs text-gray-500 mb-3">
              Click the button below and start getting feedback in minutes.
            </div>
            <ButtonPrimary @click="createNewSurveyModal()" class="w-full"
              >Create survey</ButtonPrimary
            >
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col gap-y-4">
        <div class="block font-semibold text-2xl mt-4">
          Recent surveys ({{ state.surveyList.length }})
        </div>
        <div
          v-for="(survey, index) in state.surveyList"
          :id="survey.id"
          :key="survey.id"
          class="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-y-4 items-start justify-between">
          <div class="w-full flex flex-col items-start justify-start gap-y-2">
            <div
              v-if="survey.status == 'inactive'"
              class="w-full flex flex-col gap-y-2 text-gray-700">
              <div class="block font-semibold text-xl">
                {{ survey.title }}
              </div>
              <div class="text-sm text-gray-500">
                {{ survey.description }}
              </div>
            </div>
            <a
              v-if="survey.status == 'active'"
              target="_blank"
              :href="publicPath + survey.id"
              class="w-full flex flex-col gap-y-2 text-gray-700 hover:text-cyan-600">
              <div
                class="flex flex-row items-center justify-start font-semibold text-xl">
                <i class="ri-external-link-line"></i>&nbsp;&nbsp;<span>{{
                  survey.title
                }}</span>
              </div>
              <div class="text-sm text-gray-500">
                {{ survey.description }}
              </div>
            </a>
            <div class="w-full flex flex-col gap-y-4 mt-2">
              <hr />
              <div class="flex flex-row items-start justify-start gap-2">
                <SurveyStatus :status="survey.status"></SurveyStatus>
                <div
                  class="w-auto py-2 px-3 rounded-lg font-semibold text-sm text-gray-600 bg-gray-100 capitalize">
                  0 responses
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-auto flex flex-row gap-2 md:ml-4">
            <ButtonLight
              class="w-full sm:w-auto"
              @click="router.push(`/edit/` + survey.id)"
              ><span>Edit</span><i class="ri-pencil-line"></i
            ></ButtonLight>
          </div>
        </div>
      </div>
    </div>
    <CreateSurveyModal
      v-if="state.createSurveyModal"
      :errorMessage="errorMessage"
      @createNewSurvey="createNewSurvey"
      @createNewSurveyModal="createNewSurveyModal" />
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { getCurrentUser, getUserEmail } from "@/plugins/auth";
import { fb } from "@/plugins/firebase";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import SurveyStatus from "@/components/SurveyStatus";
import CreateSurveyModal from "@/components/modals/CreateSurvey.vue";
import ButtonPrimary from "@/components/forms/ButtonPrimary";
import ButtonLight from "@/components/forms/ButtonLight";

const db = getFirestore(fb);
const fbRef = collection(db, "surveys");
const publicPath = process.env.VUE_APP_PUBLIC_PATH;
const router = useRouter();
const errorMessage = ref();

const state = reactive({
  surveyList: [],
  createSurveyModal: false,
});

const fetchData = async () => {
  const userEmail = await getUserEmail();

  const fbDocs = await getDocs(fbRef);
  const docdata = fbDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const sortedDocdata = docdata
    .filter((survey) => survey.userEmail === userEmail) // Filter surveys by userEmail
    .sort((a, b) => {
      const statusOrder = {
        active: 0,
        inactive: 1,
      };
    });

  state.surveyList = sortedDocdata;
};

const createNewSurveyModal = () => {
  state.createSurveyModal = !state.createSurveyModal;
};

const getSurveysCreatedThisMonth = (surveys) => {


  return '0';
};

const createNewSurvey = async (value) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const documentID = Array.from(
    { length: 20 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const docRef = doc(fbRef, documentID);
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const userEmail = await getUserEmail();

  if (!userEmail) {
    errorMessage.value = "Uh-oh, User is not authenticated!";
    return;
  }

  if (!value.newSurveyTitle || value.newSurveyTitle === "") {
    errorMessage.value = "Uh-oh, all fields are required!";
    return;
  }

  if (value.newSurveyDescription === "") {
    errorMessage.value = "Uh-oh, all fields are required!";
    return;
  }

  if (value.newSurveyCreator.trim() === "") {
    errorMessage.value = "Uh-oh, all fields are required!";
    return;
  }

  try {
    await setDoc(docRef, {
      title: value.newSurveyTitle,
      description: value.newSurveyDescription,
      creator: value.newSurveyCreator,
      userEmail: userEmail,
      status: "inactive",
      questions: [],
      creationDate: new Date(),
      lastUpdate: "",
      responses: [],
      views: [],
    });
    fetchData();
    state.createSurveyModal = false;
    router.push(`/edit/` + documentID);
  } catch (error) {
    (errorMessage.value = "Error creating document: "), error;
  }
};

onMounted(fetchData);
</script>
