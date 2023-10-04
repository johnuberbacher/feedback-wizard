<template>
  <button
    type="button"
    :id="props.modelValue"
    :value="modelValue"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 flex flex-row items-center justify-center gap-x-2.5 font-medium rounded-lg text-sm text-center px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
    <slot></slot>
  </button>
</template> 
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
