<template>
  <div class="text-xl font-medium text-gray-900 dark:text-white">
    Create a new survey
  </div>
  <form
    class="space-y-6"
    @submit.prevent="
      $emit('createNewSurvey', {
        newSurveyTitle: newSurveyTitle,
        newSurveyDescription: newSurveyDescription,
        newSurveyCreator: newSurveyCreator,
        newSurveyBackButton: newSurveyBackButton[0],
        newSurveyCollectUserInfo: newSurveyCollectUserInfo[0],
      })
    ">
    <InputText
      label="What is the title of this survey?"
      v-model="newSurveyTitle"
      placeholder="Customer Satisfaction Feedback" />
    <InputTextArea
      label="How would you describe the survey?"
      v-model="newSurveyDescription"
      placeholder="We're conducting this survey to gain insights into our customers' preferences and expectations. Your participation is essential to help us better serve you. Please take a few minutes to share your opinions with us." />
    <InputText
      label="Who's creating the survey?"
      v-model="newSurveyCreator"
      placeholder="John Uberbacher" />
    <div class="w-full flex flex-col gap-y-2">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Survey Settings</label
      >
      <InputCheck
        label="Show 'Back' button on questions"
        value="true"
        v-model="newSurveyBackButton" />
      <InputCheck
        label="Attempt to collect user information"
        value="true"
        v-model="newSurveyCollectUserInfo" />
    </div>
    <div class="text-sm text-gray-500 text-center">
      Click continue and start getting feedback in minutes.
    </div>
    <div
      v-if="props.errorMessage"
      class="block text-center text-red-600 font-semibold">
      {{ props.errorMessage }}
    </div>
    <ButtonPrimary type="submit" class="w-full">Create Survey</ButtonPrimary>
  </form>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import InputText from "@/components/forms/InputText";
import InputCheck from "@/components/forms/InputCheck";
import InputTextArea from "@/components/forms/InputTextArea";
import ButtonPrimary from "@/components/forms/ButtonPrimary";
const newSurveyTitle = ref(null);
const newSurveyDescription = ref(null);
const newSurveyCreator = ref(null);
const newSurveyColor = ref(null);
const newSurveyBackButton = ref(false);
const newSurveyCollectUserInfo = ref(null);
const props = defineProps(["errorMessage"]);
</script>
