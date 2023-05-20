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
      bg-cyan-600 
      hover:bg-cyan-500 
      border 
      border-cyan-700
      hover:border-cyan-600 
      text-white
      ">
     
      <slot></slot>
    </button>
  </template>
  <script setup>
  import { defineProps, defineEmits } from "vue";
  const props = defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
  </script>
  