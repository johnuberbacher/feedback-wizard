<template>
  <div>
    <Navbar></Navbar>
    <div
      class="w-full max-w-6xl mx-auto p-5 pt-10 md:p-10 flex flex-col gap-y-10">
      <div class="w-full flex flex-col gap-y-4">
        <div class="font-semibold text-3xl">Dashboard</div>
        <div class="flex flex-col md:flex-row gap-4 justify-stretch">
          <div
            class="w-full bg-white drop-shadow-md rounded-lg p-6 flex flex-grow flex-col gap-4 items-start justify-center">
            <div class="text-sm text-gray-400">Surveys created this month</div>
            <div class="font-bold text-5xl">
              {{ getSurveysCreatedThisMonth(state.surveyList) }}
            </div>
          </div>
          <div
            class="w-full bg-white drop-shadow-md rounded-lg p-6 flex flex-grow flex-col gap-4 items-start justify-center">
            <div class="text-sm text-gray-400">Survey views this month</div>
            <div class="font-bold text-5xl">0</div>
          </div>
          <div
            class="w-full bg-white drop-shadow-md rounded-lg p-6 flex flex-grow flex-col gap-4 items-start justify-center">
            <div class="text-sm text-gray-400">Survey responses this month</div>
            <div class="font-bold text-5xl">0</div>
          </div>
          <div
            class="w-full bg-white drop-shadow-md rounded-lg p-4 flex flex-grow flex-col items-center justify-center text-center">
            <div class="block font-semibold text-xl mb-1">Get feedback</div>
            <div class="text-xs text-gray-400 mb-3">
              Click the button below and start getting feedback in minutes.
            </div>
            <button
              @click="createNewSurveyModal()"
              class="bg-cyan-600 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 text-white font-medium w-full py-2 px-6 rounded-lg drop-shadow hover:drop-shadow-lg">
              Create survey
            </button>
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
          class="bg-white drop-shadow-md rounded-lg py-8 px-8 flex flex-col md:flex-row gap-y-4 items-start justify-between">
          <div class="flex flex-col items-start justify-start gap-y-2">
            <div
              v-if="survey.status == 'inactive'"
              class="w-full flex flex-col gap-y-2 text-gray-700">
              <div class="block font-semibold text-xl">
                {{ survey.title }}
              </div>
              <div class="text-sm text-gray-400">
                {{ survey.description }}
              </div>
            </div>
            <a
              v-if="survey.status == 'active'"
              target="_blank"
              :href="publicPath + survey.id"
              class="w-full flex flex-col gap-y-2 text-gray-700 hover:text-cyan-500">
              <div class="block font-semibold text-xl">
                <i class="ri-external-link-line"></i>&nbsp;&nbsp;{{
                  survey.title
                }}
              </div>
              <div class="text-sm text-gray-400">
                {{ survey.description }}
              </div>
            </a>
            <div class="flex flex-row items-start justify-start gap-2">
              <div
                v-if="survey.status == 'active'"
                class="w-auto py-2 px-3 rounded-lg font-semibold text-xs bg-lime-200 text-lime-800 capitalize">
                {{ survey.status }}
              </div>
              <div
                v-if="survey.status == 'inactive'"
                class="w-auto py-2 px-3 rounded-lg font-semibold text-xs bg-red-100 text-red-600 capitalize">
                {{ survey.status }}
              </div>
              <div
                class="w-auto py-2 px-3 rounded-lg font-semibold text-xs bg-gray-100 text-gray-600 capitalize">
                {{
                  survey.creationDate
                    ? getCreationDate(survey.creationDate)
                    : "&nbsp;"
                }}
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-2 md:ml-4">
            <router-link
              :to="`/edit/` + survey.id"
              class="bg-gray-50 border hover:bg-white text-gray-600 font-medium py-2 px-6 rounded-lg">
              Edit
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <CreateSurveyModal
      v-if="state.createSurveyModal"
      @createNewSurvey="createNewSurvey"
      @createNewSurveyModal="createNewSurveyModal" />
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { fb } from "@/plugins/firebase";
import Navbar from "@/components/Navbar.vue";
import CreateSurveyModal from "@/components/modals/CreateSurvey.vue";

const db = getFirestore(fb);
const fbRef = collection(db, "surveys");
const publicPath = process.env.VUE_APP_PUBLIC_PATH;

const state = reactive({
  surveyList: [],
  createSurveyModal: false,
});

const fetchData = async () => {
  console.log(publicPath)
  const fbDocs = await getDocs(fbRef);
  const docdata = fbDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  // Sort data by Status then Date
  const sortedDocdata = docdata.sort((a, b) => {
    if (a.status === "active" && b.status === "inactive") return -1;
    if (a.status === "inactive" && b.status === "active") return 1;
    if (a.creationDate < b.creationDate) return -1;
    if (a.creationDate > b.creationDate) return 1;
    return 0;
  });

  state.surveyList = sortedDocdata;
};

const createNewSurveyModal = () => {
  state.createSurveyModal = !state.createSurveyModal;
};

const getSurveysCreatedThisMonth = (surveys) => {
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const surveysThisMonth = surveys.filter((survey) => {
    const creationYear = survey.creationDate.substring(0, 4);
    const creationMonth = survey.creationDate.substring(4, 6) - 1;
    const creationDay = survey.creationDate.substring(6, 8);
    const creationDate = new Date(creationYear, creationMonth, creationDay);

    return creationDate >= thisMonth;
  });

  return surveysThisMonth.length;
};

const getCreationDate = (date) => {
  return `${date.substring(4, 6)}/${date.substring(6, 8)}/${date.substring(
    0,
    4
  )}`;
};

const createNewSurvey = async (value) => {
  console.log(value);
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const documentID = [...Array(20)]
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
  const docRef = doc(fbRef, documentID);
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  try {
    await setDoc(docRef, {
      title: value.newSurveyTitle,
      description: value.newSurveyDescription,
      creator: value.newSurveyCreator,
      status: "inactive",
      questions: [],
      creationDate: `${year}${month}${day}`,
    });
    fetchData();
    state.createSurveyModal = false;
  } catch (error) {
    console.error("Error creating document: ", error);
  }
};

onMounted(fetchData);
</script>
