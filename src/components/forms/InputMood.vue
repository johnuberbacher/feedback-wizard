<template>
    <div class="w-full flex items-center justify-start">
      <input
        type="radio"
        :name="props.group"
        :value="props.value"
        :id="props.id"
        @input="$emit('update:modelValue', $event.target.value)"
        class="hidden peer"
        :checked="props.value === props.modelValue" />
      <label
        :for="props.id"
        class="select-none flex flex-col items-center justify-center gap-y-2 text-center w-full p-6 bg-white border border-gray-300 shadow rounded-lg cursor-pointer peer-checked:bg-cyan-50 peer-checked:border-cyan-600 peer-checked:text-cyan-600 hover:bg-gray-100">
        <div class="w-full text-3xl font-semibold">{{ emoji[index] }}</div>
        <div class="w-full">{{ props.label }}</div>
      </label>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from "vue";
  const props = defineProps(["label", "group", "modelValue", "value", "id", "index"]);
  const emoji = ref(['😍','😃','🙂','😐','🙁'])
  defineEmits(['update:modelValue']);
  </script>