<template>
  <label class="w-full flex items-center mb-4 select-none">
    <input
      type="radio"
      :name="props.group"
      :value="props.value"
      :id="props.id"
      @input="$emit('update:modelValue', $event.target.value)"
      :tabindex="props.tabindex"
      class="relative select-none float-left w-[24px] h-[24px] min-w-[24px] min-h-[24px] cursor-pointer appearance-none rounded-full 
      border-2 border-solid 
      border-gray-300 dark:border-gray-600 
      after:absolute after:z-[1] after:block after:h-5 after:w-5 after:rounded-full after:content-[''] after:shadow 
      after:bg-white dark:after:bg-gray-800 
      checked:text-blue-600 checked:border-blue-600 checked:bg-white dark:checked:bg-gray-800 checked:after:border-blue-600 checked:after:bg-blue-600 
      checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] 
      checked:after:rounded-full checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] 
      focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
      :checked="props.value === props.modelValue"
    />
    <span :for="props.id" class="pl-4 cursor-pointer min-h-[24px] font-medium text-gray-900 dark:text-gray-300 select-none">{{ props.label }}</span>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["label", "group", "modelValue", "value", "id", "tabindex"]);
defineEmits(['update:modelValue']);
</script>