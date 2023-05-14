<template>
  <textarea
    type="text"
    rows="5"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    v-model="props.model"
    class="flex p-2.5 w-full drop-shadow text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 focus:drop-shadow-lg"
  ></textarea>
</template>
<script setup>
const props = defineProps(["id", "name", "placeholder", "model"]);
</script>
