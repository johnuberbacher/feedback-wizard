<template>
  <div class="flex items-center justify-start pl-[1.5rem]">
    <input
      type="radio"
      :placeholder="props.placeholder"
      :name="props.name"
      :id="props.value"
      :value="props.value"
      v-model="props.model"
      :tabindex="props.tabindex"
      class="relative float-left -ml-6 h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-solid border-gray-300 after:absolute after:z-[1] after:block after:h-5 after:w-5 after:rounded-full after:content-[''] after:bg-white after:drop-shadow-md checked:border-cyan-600 checked:bg-white checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-cyan-600 checked:after:bg-cyan-600 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] checked:text-cyan-600 focus:shadow-none focus:outline-none focus:ring-0 checked:focus:border-cyan-600" />
    <label :for="props.value" class="w-full py-2 pl-3 cursor-pointer"
      >{{ props.label }}
    </label>
  </div>
</template>
<script setup>
const props = defineProps(["label", "model", "value", "name", "tabindex"]);
</script>
