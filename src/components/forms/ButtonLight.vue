<template>
  <button
    type="button"
    :id="props.modelValue"
    :value="modelValue"
    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 flex flex-row items-center justify-center gap-x-2.5 font-medium rounded-lg text-sm text-center px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
    <slot></slot>
  </button>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
