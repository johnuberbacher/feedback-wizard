<template>
  <div>
    <Navbar></Navbar>
    <div class="w-full max-w-6xl mx-auto p-4 py-10 flex flex-col gap-y-10">
      <div class="w-full flex flex-col gap-y-4">
        <div
          class="block font-semibold text-3xl whitespace-nowrap text-gray-900 dark:text-white">
          Dashboard
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-stretch">
          <StatCard
            description="Surveys created this month"
            :stat="state.recentSurveyList.length"></StatCard>
          <StatCard
            description="Survey views this month"
            :stat="state.surveyViewsThisMonth"></StatCard>
          <StatCard
            description="Surveys responses this month"
            :stat="`0`"></StatCard>
          <div
            class="col-span-1 md:col-span-1 w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-center text-center">
            <div
              class="block font-semibold text-lg text-gray-900 dark:text-white">
              Get Feedback
            </div>
            <div class="text-xs text-gray-700 dark:text-gray-400 mt-1">
              Click the button below and start getting feedback in minutes.
            </div>
            <ButtonPrimary @click="createNewSurveyModal()" class="w-full mt-2"
              >Create survey</ButtonPrimary
            >
          </div>
        </div>
      </div>
      <div
        v-if="state.recentSurveyList.length <= 0"
        class="w-full max-w-6xl flex flex-col gap-y-4 p-5 md:pb-10 mx-auto">
        <div class="w-auto max-w-fit flex flex-row gap-x-4">
          <!--v-if--><!--v-if-->
        </div>
        <div
          class="max-w-xl mx-auto text-center font-semibold text-xl text-gray-900 dark:text-white">
          Ready to start building your survey?
        </div>
        <div class="max-w-xl mx-auto text-center text-sm text-gray-500">
          Your survey is a blank canvas, waiting for you to bring it to life
          with your questions. You're just a click away! Add your first question
          now.
        </div>
        <!--v-if-->
        <div class="w-auto flex flex-col items-center justify-center gap-y-4">
          <ButtonPrimary @click="createNewSurveyModal()"
            >Create survey</ButtonPrimary
          >
        </div>
      </div>
      <div class="w-full flex flex-col gap-y-4">
        <div
          class="block font-semibold text-lg whitespace-nowrap text-gray-900 dark:text-white"
          v-if="state.recentSurveyList.length > 0">
          Recent Surveys ({{ state.recentSurveyList.length }})
        </div>
        <SurveyList :surveyList="state.recentSurveyList"></SurveyList>
        <div v-if="state.recentSurveyList.length > 0" class="d-inline">
          <ButtonPrimary class="w-full" @click="surveySidePanel = true"
            ><span>View All Surveys</span><i class="ri-arrow-right-up-line"></i
          ></ButtonPrimary>
        </div>
        <!--<div
          class="block font-semibold text-lg whitespace-nowrap text-gray-900 dark:text-white"
          v-if="state.responseList.length > 0"
        >
          Recent Responses ({{ state.responseList.length }})
        </div>
        <ResponseList :responseList="state.responseList"></ResponseList>-->
      </div>
    </div>
    <SidePanel v-if="surveySidePanel" @close="surveySidePanel = false">
      <div class="text-xl font-medium text-gray-900 dark:text-white">
        Surveys
      </div>
      <SurveyList :surveyList="state.surveyList" />
    </SidePanel>
    <SidePanel
      v-if="state.createSurveyModal"
      @close="state.createSurveyModal = false">
      <CreateSurveyModal
        :errorMessage="errorMessage"
        @createNewSurvey="createNewSurvey"
        @createNewSurveyModal="createNewSurveyModal">
      </CreateSurveyModal>
    </SidePanel>
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
import SidePanel from "@/components/SidePanel.vue";
import SurveyList from "@/components/SurveyList";
import StatCard from "@/components/StatCard.vue";
import ResponseList from "@/components/ResponseList";
import CreateSurveyModal from "@/components/modals/CreateSurvey.vue";
import ButtonPrimary from "@/components/forms/ButtonPrimary";
import ButtonLight from "@/components/forms/ButtonLight";

const db = getFirestore(fb);
const surveyCollectionRef = collection(db, "surveys");
const publicPath = process.env.VUE_APP_PUBLIC_PATH;
const router = useRouter();
const errorMessage = ref();
const surveySidePanel = ref(false);

const state = reactive({
  surveyList: [],
  responseList: [],
  recentSurveyList: [],
  createSurveyModal: false,
  surveyViewsThisMonth: 0,
});

const fetchData = async () => {
  const userEmail = await getUserEmail();

  const surveyDocs = await getDocs(surveyCollectionRef);

  const surveyData = surveyDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const currentDate = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);
  const recentSurveys = [];
  const olderSurveys = [];
  const recentResponses = [];

  for (const survey of surveyData) {
    if (survey.userEmail === userEmail) {
      if (survey.creationDate !== undefined) {
        // Convert Firestore Timestamp to a JavaScript Date object
        const creationDate = survey.creationDate.toDate();

        // Calculate the difference in days between the current date and creation date
        const timeDifference = Math.abs(currentDate - creationDate);
        const daysDifference = Math.ceil(
          timeDifference / (1000 * 60 * 60 * 24)
        );

        // Check if the survey was created within 30 days
        if (daysDifference <= 30) {
          recentSurveys.push(survey);
        } else {
          olderSurveys.push(survey);
        }
      } else {
        // Handle surveys without creationDate here (if needed)
      }
    }
  }

  state.recentSurveyList = recentSurveys;
  state.surveyList = recentSurveys.concat(olderSurveys); // Combine older and recent surveys
  state.responseList = recentResponses;

  getDashboardSurveyStats();
};

const createNewSurveyModal = () => {
  state.createSurveyModal = !state.createSurveyModal;
};

const getDashboardSurveyStats = () => {
  const currentDate = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  const uniqueViewDates = new Set();

  for (const survey of state.surveyList) {
    if (Array.isArray(survey.views)) {
      for (const viewDate of survey.views) {
        const viewDateObj = new Date(viewDate);
        if (viewDateObj >= thirtyDaysAgo) {
          uniqueViewDates.add(viewDate);
        }
      }
    }
  }

  state.surveyViewsThisMonth = uniqueViewDates.size;
};

const createNewSurvey = async (value) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const documentID = Array.from(
    { length: 20 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");

  const docRef = doc(surveyCollectionRef, documentID);

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const userEmail = await getUserEmail();

  console.log(value);

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

  // Push the new survey data to Firebase
  try {
    await setDoc(docRef, {
      title: value.newSurveyTitle,
      description: value.newSurveyDescription,
      creator: value.newSurveyCreator,
      userEmail: userEmail,
      status: "inactive",
      questions: [],
      showBackButton: value.newSurveyBackButton,
      collectUserInfo: value.newSurveyCollectUserInfo,
      creationDate: new Date(),
      lastUpdate: "",
      responses: [],
      views: [],
    });
    fetchData();
    state.createSurveyModal = false;
    router.push(`/edit/` + documentID);
  } catch (error) {
    errorMessage.value = "Error creating document: " + error;
    return;
  }
};

onMounted(fetchData);
</script>
