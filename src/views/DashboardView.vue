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
            <ButtonPrimary @click="createNewSurveyModal()" class="w-full">Create survey</ButtonPrimary>
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
              <div class="flex flex-row items-center justify-start font-semibold text-xl">
                <i class="ri-external-link-line"></i>&nbsp;&nbsp;<span>{{
                  survey.title
                }}</span>
              </div>
              <div class="text-sm text-gray-500">
                {{ survey.description }}
              </div>
            </a>
            <div class="w-full flex flex-col gap-y-4 mt-2">
            <hr/>
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
            <ButtonLight class="shadow" @click="this.$router.push(`/edit/` + survey.id);"><span>Edit</span><i class="ri-pencil-line"></i></ButtonLight>
          </div>
        </div>
        <!--<ButtonLight class="bg-white w-auto mr-auto ml-0">See all surveys</ButtonLight>-->
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
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
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

const state = reactive({
  surveyList: [],
  createSurveyModal: false,
});

const fetchData = async () => {
  console.log(publicPath);
  const fbDocs = await getDocs(fbRef);
  const docdata = fbDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const sortedDocdata = docdata.sort((a, b) => {
    const statusOrder = {
      active: 0,
      inactive: 1,
    };

    if (statusOrder[a.status] < statusOrder[b.status]) return -1;
    if (statusOrder[a.status] > statusOrder[b.status]) return 1;
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
    const creationDate = new Date(survey.creationDate.slice(0, 4), survey.creationDate.slice(4, 6) - 1, survey.creationDate.slice(6, 8));
    return creationDate >= thisMonth;
  });

  return surveysThisMonth.length;
};

const getCreationDate = (date) => {
  return `${date.slice(4, 6)}/${date.slice(6, 8)}/${date.slice(0, 4)}`;
};

const createNewSurvey = async (value) => {
  console.log(value);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const documentID = Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
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
    router.push(`/edit/` + documentID);
  } catch (error) {
    console.error("Error creating document: ", error);
  }
};

onMounted(fetchData);
</script>
