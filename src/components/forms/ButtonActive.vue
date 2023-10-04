<template>
  <button
    type="button"
    :id="props.modelValue"
    :value="modelValue"
    class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 flex flex-row items-center justify-center gap-x-2.5 font-medium rounded-lg text-sm text-center px-5 py-2.5 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
    <slot></slot>
  </button>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
