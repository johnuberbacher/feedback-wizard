<template>
  <div class="w-full">
    <label
      v-if="props.label"
      :for="props.modelValue"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ props.label }}</label
    >
    <textarea
      required
      :id="props.modelValue"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      rows="4"
      class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    ></textarea>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["label", "modelValue", "type", "placeholder"]);
defineEmits(['update:modelValue'])
</script>
