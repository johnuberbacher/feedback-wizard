<template>
  <button
    type="button"
    :id="props.modelValue"
    :value="modelValue"
    class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 flex flex-row items-center justify-center gap-x-2.5 font-medium rounded-lg text-sm text-center px-5 py-2.5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
    <slot></slot>
  </button>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>



