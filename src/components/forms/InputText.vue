<template>
  <div class="w-full">
    <label
      v-if="props.label"
      :for="props.model"
      class="block text-gray-500 font-medium mb-2"
      >{{ props.label }}</label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :name="props.model"
      :id="props.model"
      :value="props.model"
      v-model="props.model"
      @input="$emit('update:model', $event.target.value)"
      class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block shadow w-full py-3 px-4"
      required />
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["label", "model", "value", "type", "placeholder"]);
const emits = defineEmits(["update:model"]);
</script>
