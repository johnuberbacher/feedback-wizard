<template>
  <div class="w-full">
    <label
      v-if="props.label"
      :for="props.modelValue"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ props.label }}</label
    >
    <input
      type="text"
      :id="props.modelValue"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"      required
    />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["label", "modelValue", "type", "placeholder"]);
defineEmits(["update:modelValue"]);
</script>
