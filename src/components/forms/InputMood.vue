<template>
  <label
    class="block h-full rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
    <div class="h-full w-full flex items-center justify-start">
      <input
        type="radio"
        :name="props.group"
        :value="props.value"
        :id="props.id"
        @input="$emit('update:modelValue', $event.target.value)"
        class="hidden peer"
        :checked="props.value === props.modelValue" />
      <div
        :for="props.id"
        class="select-none flex flex-col items-center justify-center gap-y-2 text-center h-full w-full p-6 text-gray-900 dark:text-gray-300 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow rounded-lg cursor-pointer peer-checked:text-white peer-checked:bg-blue-700 peer-checked:border-blue-500">
        <div class="w-full text-3xl font-semibold">{{ emoji[index] }}</div>
        <div class="w-full font-medium peer-checked:text-white">
          {{ props.label }}
        </div>
      </div>
    </div>
  </label>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps([
  "label",
  "group",
  "modelValue",
  "value",
  "id",
  "index",
]);
const emoji = ref(["😍", "😃", "🙂", "😐", "🙁"]);

defineEmits(["update:modelValue"]);
</script>
