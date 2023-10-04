<template>
  <div>
    <Navbar></Navbar>
    <DeleteSurveyModal
      v-if="state.deleteSurveyModal"
      @deleteSurveyModal="deleteSurveyModal()"
      @deleteSurvey="deleteSurvey(state.survey.id)"></DeleteSurveyModal>
    <div
      class="bg-white border-b border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
      <div
        class="w-full max-w-6xl mx-auto p-5 py-10 flex flex-col items-start justify-start gap-y-4">
        <div class="w-full flex flex-row items-start justify-between">
          <div class="font-semibold text-3xl text-gray-900 dark:text-white">
            {{ state.survey.title }}
          </div>
          <!--<ButtonLight class="py-0 px-0 w-11 h-11 min-w-[44px]" @click="toggleSettingsMenu()"
            ><i class="ri-settings-3-line text-xl"></i><span class="sr-only">Survey Settings</span></ButtonLight
          >-->
        </div>
        <div
          v-if="state.survey.creator"
          class="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap capitalize">
          {{ state.survey.creator }}
        </div>
        <div
          v-if="state.survey.description"
          class="text-sm text-gray-700 dark:text-gray-400">
          {{ state.survey.description }}
        </div>
        <div class="w-full flex flex-row gap-x-4">
          <ButtonDanger
            v-if="state.survey.status == 'active'"
            @click="toggleSurveyStatus(state.survey.id)"
            >Disable&nbsp;survey</ButtonDanger
          >
          <ButtonDanger
            v-if="state.survey.status == 'inactive'"
            @click="deleteSurveyModal(state.survey.id)"
            >Delete&nbsp;survey</ButtonDanger
          >
          <ButtonActive
            v-if="
              state.survey.questions?.length > 0 &&
              state.survey.status == 'inactive'
            "
            @click="toggleSurveyStatus(state.survey.id)"
            >Activate&nbsp;survey</ButtonActive
          >
          <ButtonLight
            class="overflow-hidden"
            v-if="state.survey.status == 'active'"
            @click="openLinkInTab(location + publicPath + state.survey.id)"
            ><span class="truncate">{{
              location + publicPath + state.survey.id
            }}</span
            ><i class="ri-external-link-line"></i
          ></ButtonLight>
        </div>
        <hr
          class="w-full mt-4 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700" />
        <div class="w-full flex flex-row gap-x-2">
          <div class="space-y-1">
            <div class="font-medium text-xs text-gray-900 dark:text-white">
              Status
            </div>
            <SurveyStatus :status="state.survey.status"></SurveyStatus>
          </div>
          <div v-if="state.survey.creationDate" class="space-y-1">
            <div class="font-medium text-xs text-gray-900 dark:text-white">
              Created
            </div>
            <div
              class="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap capitalize">
              {{
                new Date(
                  state.survey.creationDate.seconds * 1000
                ).toLocaleDateString("en-US")
              }}
            </div>
          </div>
          <div v-if="state.survey.views" class="space-y-1">
            <div class="font-medium text-xs text-gray-900 dark:text-white">
              Views
            </div>
            <div
              class="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap capitalize">
              {{ state.survey.views.length > 0 ? state.survey.views.length : 0 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full max-w-6xl flex flex-col gap-y-4 p-5 md:pb-10 mx-auto">
      <!---->
      <div
        v-if="state.responseList?.length > 0"
        class="border-b border-gray-200 dark:border-gray-700">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li class="mr-2">
            <div
              :class="{
                'text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500':
                  activeTab === 'questions',
                'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                  activeTab !== 'questions',
              }"
              @click="activeTab = 'questions'"
              class="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group">
              <svg
                :class="{
                  'text-blue-600 dark:text-blue-500': activeTab === 'questions',
                  'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300':
                    activeTab !== 'questions',
                }"
                class="w-4 h-4 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.88637 7.70919 8.56731 9.31346L10.5288 9.70577C10.6656 9.01823 11.2723 8.5 12 8.5C12.8284 8.5 13.5 9.17157 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z"></path>
              </svg>
              Questions&nbsp;({{ state.survey.questions?.length ?? 0 }})
            </div>
          </li>
          <li class="mr-2">
            <div
              :class="{
                'text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500':
                  activeTab === 'responses',
                'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                  activeTab !== 'responses',
              }"
              @click="activeTab = 'responses'"
              class="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group">
              <svg
                :class="{
                  'text-blue-600 dark:text-blue-500': activeTab === 'responses',
                  'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300':
                    activeTab !== 'responses',
                }"
                class="w-4 h-4 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              Responses&nbsp;({{ state.responseList?.length ?? 0 }})
            </div>
          </li>
          <li class="">
            <div
              :class="{
                'text-blue-600 border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500':
                  activeTab === 'trends',
                'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                  activeTab !== 'trends',
              }"
              @click="activeTab = 'trends'"
              class="cursor-pointer inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group">
              <svg
                :class="{
                  'text-blue-600 dark:text-blue-500': activeTab === 'trends',
                  'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300':
                    activeTab !== 'trends',
                }"
                class="w-4 h-4 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" /></svg>
                  Trends
            </div>
          </li>
        </ul>
      </div>
      <!---->
      <div
        v-if="state.survey.questions?.length <= 0"
        class="max-w-xl mx-auto text-center font-semibold text-xl text-gray-900 dark:text-white">
        Ready to start building your survey?
      </div>
      <div
        v-if="state.survey.questions?.length <= 0"
        class="max-w-xl mx-auto text-center text-sm text-gray-500">
        Your survey is a blank canvas, waiting for you to bring it to life with
        your questions. You're just a click away! Add your first question now.
      </div>
      <div
        class="w-full flex flex-col gap-y-4"
        v-if="activeTab === 'responses'">
        <ResponseList
          :responseList="state.responseList"
          @viewResponse="viewResponse"></ResponseList>
      </div>
      <div
        class="w-full flex flex-col gap-y-4"
        v-if="activeTab === 'questions'">
        <div
          v-for="(question, questionIndex) in state.survey.questions"
          :key="question"
          class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row gap-y-4 items-start justify-between">
          <div class="w-full flex flex-col items-start justify-start gap-y-2">
            <div class="w-full flex flex-col gap-y-4">
              <div
                class="block font-semibold text-md text-gray-900 dark:text-white">
                {{ question.title }}
              </div>
              <div class="flex flex-row items-start justify-start gap-2">
                <span
                  class="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap capitalize"
                  >{{ question.type }}&nbsp;choice</span
                >
                <span
                  class="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 whitespace-nowrap"
                  >{{ question.options?.length }}&nbsp;options</span
                >
              </div>
            </div>
          </div>
          <div class="w-full sm:w-auto flex flex-row items-start gap-2 md:ml-4">
            <ButtonLight
              class="w-full sm:w-auto"
              @click="editQuestion(questionIndex)">
              <span>Edit</span><i class="ri-pencil-line"></i>
            </ButtonLight>
            <ButtonDanger @click="deleteQuestion(questionIndex)">
              <i class="ri-delete-bin-line"></i>
            </ButtonDanger>
          </div>
        </div>
        <ButtonLight
          :class="{
            'mx-auto mr-auto ml-auto': state.survey.questions?.length <= 0,
          }"
          class="w-auto ml-auto"
          @click="addNewQuestion(state.survey.id)"
          ><span>add&nbsp;question</span
          ><i class="ri-add-line font-semibold"></i
        ></ButtonLight>
      </div>
    </div>
    <SidePanel
      v-if="showPanelEditQuestion"
      @close="showPanelEditQuestion = false">
      <form class="space-y-6" @submit.prevent="saveQuestion()">
        <InputText
          label="Question Title"
          v-model="state.tempForm.title"
          placeholder="Question Title" />
        <div class="w-full">
          <label
            for="questionType"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Question Type</label
          >
          <select
            v-model="state.tempForm.type"
            id="questionType"
            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
            <option value="text">Text Response</option>
            <option value="mood">Mood Scale</option>
          </select>
        </div>
        <div
          v-if="
            state.tempForm.type == 'single' || state.tempForm.type == 'multiple'
          "
          class="space-y-2">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Options</label
          >
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
            ><span>add&nbsp;option</span
            ><i class="ri-add-line font-semibold"></i
          ></ButtonLight>
        </div>
        <div
          v-if="errorMessage"
          class="block text-center text-red-600 font-semibold">
          {{ errorMessage }}
        </div>
        <div v-if="state.tempForm.type == 'mood'" class="space-y-2">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Options</label
          >
          <div
            class="w-full flex flex-row gap-2 items-center relative"
            v-for="(option, optionIndex) in 5"
            v-bind:key="optionIndex">
            <div
              class="text-2xl h-10 w-10 min-w-10 -ml-1 mr-2 flex items-center justify-center">
              {{ emoji[optionIndex] }}
            </div>
            <InputText
              label=""
              class=""
              v-model="state.tempForm.options[optionIndex]"
              placeholder="Enter your response here..." />
          </div>
        </div>
        <ButtonPrimary type="submit" class="w-full"
          >Save Question</ButtonPrimary
        >
      </form>
    </SidePanel>
    <SidePanel
      v-if="showPanelViewResponse"
      @close="showPanelViewResponse = false">
      <div class="flex flex-row items-start justify-between gap-4">
        <div
          class="bg-cyan-600 rounded-full w-[44px] min-w-[44px] min-h-[44px] h-[44px] overflow-hidden flex items-center justify-center">
          <i class="ri-user-fill text-[44px] mt-3 text-white"></i>
        </div>
        <div class="w-full flex flex-col items-start justify-start gap-y-2">
          <div class="w-full flex flex-col text-gray-700">
            <div
              class="block font-semibold text-md text-gray-900 dark:text-white">
              Anonymous
            </div>
            <div class="text-sm text-gray-700 dark:text-gray-400">
              Completed the <span class="font-semibold"></span> survey about 21
              minutes ago
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(userResponse, index) in state.tempResponse.userResponses"
        :key="index">
        <div
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {{ userResponse.questionTitle }}
        </div>
        <div
          class="w-full p-6 text-gray-700 dark:text-gray-400 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-y-2 items-start justify-center">
          <span v-if="userResponse.responseType == 'multiple'">
            <span
              v-for="response in userResponse.response"
              :key="response"
              class="block"
              >{{ response }}</span
            >
          </span>
          <span v-else>
            <span>{{ userResponse.response }}</span>
          </span>
        </div>
      </div>
      <div class="text-center text-xs text-gray-700 dark:text-gray-400">
        Survey responses are presented as a static snapshot, capturing the
        survey's questions and responses precisely as they existed at the time
        of submission. This ensures the authenticity and reliability of the
        feedback received.
      </div>
    </SidePanel>
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
import { getCurrentUser, getUserEmail } from "@/plugins/auth";
import { useRouter, useRoute } from "vue-router";
import Navbar from "@/components/Navbar";
import SurveyStatus from "@/components/SurveyStatus";
import ResponseList from "@/components/ResponseList";
import InputText from "@/components/forms/InputText";
import SidePanel from "@/components/SidePanel.vue";
import DeleteSurveyModal from "@/components/modals/DeleteSurvey";
import ButtonPrimary from "@/components/forms/ButtonPrimary";
import ButtonDanger from "@/components/forms/ButtonDanger";
import ButtonLight from "@/components/forms/ButtonLight";
import ButtonActive from "@/components/forms/ButtonActive";

const db = getFirestore(fb);
const surveyCollectionRef = collection(db, "surveys");
const responseCollectionRef = collection(db, "responses");
const route = useRoute();
const currentRoute = route.params.id;
const router = useRouter();
const location = window.location.origin;
const publicPath = process.env.VUE_APP_PUBLIC_PATH;
const showPanelEditQuestion = ref(false);
const showPanelViewResponse = ref(false);
const errorMessage = ref("");
const emoji = ref(["😍", "😃", "🙂", "😐", "🙁"]);
const activeTab = ref("questions");

const state = reactive({
  survey: {},
  responseList: [],
  deleteSurveyModal: false,
  tempForm: {},
  tempResponse: [],
});

const fetchData = async () => {
  const userEmail = await getUserEmail();

  const docRef = doc(db, "surveys", currentRoute);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    state.survey = { ...snapshot.data(), id: snapshot.id };
    state.responseList = state.survey.responses;
  } else {
    router.push("/dashboard");
  }
};

const openLinkInTab = (url) => {
  window.open(url, "_blank");
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
    fetchData();
  } else {
    errorMessage.value = "Survey does not exist.";
  }
};

const toggleSettingsMenu = async (questionIndex) => {
  showPanelEditQuestion.value = true;
};

const editQuestion = async (questionIndex) => {
  errorMessage.value = "";
  fetchData();
  state.tempForm.questionIndex = questionIndex;
  state.tempForm.title = state.survey.questions[questionIndex].title;
  state.tempForm.type = state.survey.questions[questionIndex].type;
  state.tempForm.options = await state.survey.questions[questionIndex].options;
  showPanelEditQuestion.value = true;
};

const saveQuestion = async () => {
  if (state.tempForm.title.trim() === "") {
    errorMessage.value = "Uh-oh, all fields are required!";
    return;
  }

  if (state.tempForm.type.trim() === "") {
    errorMessage.value = "Uh-oh, all fields are required!";
    return;
  }

  if (state.tempForm.options.every((option) => option.trim() !== "")) {
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
    showPanelEditQuestion.value = false;
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
    errorMessage = "Survey document does not exist!";
  }
};

const viewResponse = async (response) => {
  errorMessage.value = "";
  state.tempResponse = response;
  showPanelViewResponse.value = true;
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

const toggleSurveyStatus = async (id) => {
  const docRef = doc(db, "surveys", id);
  const docSnap = await getDoc(docRef);
  const surveyData = docSnap.data();

  if (surveyData.status === "active") {
    await updateDoc(docRef, { status: "inactive" });
  } else if (surveyData.status === "inactive") {
    await updateDoc(docRef, { status: "active" });
  }

  fetchData();
};

const deleteSurvey = async (id) => {
  const docRef = doc(db, "surveys", id);
  await deleteDoc(docRef);
  state.deleteSurveyModal == false;
  router.push("/dashboard");
};

onMounted(() => {
  fetchData();
});
</script>
