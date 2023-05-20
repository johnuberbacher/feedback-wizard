<template>
    <button
      type="button"
      :id="props.modelValue"
      :value="modelValue"
      class="
      flex 
      flex-row 
      items-center 
      justify-center 
      gap-x-2  
      px-4 
      py-2 
      transition-all
      transform 
      text-center
      rounded-md 
      select-none
      shadow
      font-medium
      text-red-600 
      border 
      border-red-200 
      bg-red-50 
      hover:bg-red-100">
      <slot></slot>
    </button>
  </template>
  <script setup>
  import { defineProps, defineEmits } from "vue";
  const props = defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
  </script>
  