<template>
  <div class="flex items-center justify-start pl-[1.5rem]">
    <input
      type="radio"
      :name="props.group"
      :value="props.value"
      :id="props.id"
      @input="$emit('update:modelValue', $event.target.value)"
      :tabindex="props.tabindex"
      class="relative select-none float-left -ml-6 h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-solid border-gray-300 after:absolute after:z-[1] after:block after:h-5 after:w-5 after:rounded-full after:content-[''] after:bg-white after:shadow-md checked:border-cyan-600 checked:bg-white checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-cyan-600 checked:after:bg-cyan-600 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] checked:text-cyan-600 focus:shadow-none focus:outline-none focus:ring-0 checked:focus:border-cyan-600"
      :checked="props.value === props.modelValue"
    />
    <label :for="props.id" class="w-full py-2 pl-3 cursor-pointer select-none">{{ props.label }}</label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["label", "group", "modelValue", "value", "id", "tabindex"]);
defineEmits(['update:modelValue']);
</script>
