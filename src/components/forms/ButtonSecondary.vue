<template>
  <button
    type="button"
    :id="props.modelValue"
    :value="modelValue"
    class="flex flex-row items-center justify-center gap-x-2 px-4 py-2 font-base text-cyan-600 transition-all transform border border-cyan-600 rounded bg-cyan-50 hover:bg-cyan-600 hover:text-white text-center select-none">
    <slot></slot>
  </button>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
