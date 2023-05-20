<template>
  <div class="w-full">
    <label
      v-if="props.label"
      :for="props.modelValue"
      class="block text-gray-500 font-medium mb-2"
      >{{ props.label }}</label>
    <textarea
      type="text"
      rows="4"
      :id="props.modelValue"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block shadow w-full py-3 px-4"
      required ></textarea>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["label", "modelValue", "type", "placeholder"]);
defineEmits(['update:modelValue'])
</script>
