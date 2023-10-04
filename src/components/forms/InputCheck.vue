<template>
  <label class="w-full flex items-center mb-4 select-none">
    <input
      type="checkbox"
      :placeholder="props.placeholder ?? ''"
      :name="props.group ?? ''"
      :id="props.id ?? ''"
      :value="props.value ?? ''"
      :checked="isChecked"
      @change="toggleSelection"
      :tabindex="props.tabindex ?? ''"
      class="relative select-none float-left w-[24px] h-[24px] min-w-[24px] min-h-[24px] cursor-pointer appearance-none rounded 
      border-2 border-solid 
      border-gray-300 dark:border-gray-600 
      after:absolute after:z-[1] after:block after:h-5 after:w-5 after:rounded after:content-[''] after:shadow 
      after:bg-white dark:after:bg-gray-800 
      checked:text-blue-600 checked:border-blue-600 checked:bg-white dark:checked:bg-gray-800 checked:after:border-blue-600 checked:after:bg-blue-600 
      checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] 
      checked:after:rounded checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] 
      focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
    />
    <div :for="props.value" class="pl-4 cursor-pointer min-h-[24px] font-medium text-gray-900 dark:text-gray-300 select-none">{{ props.label }}</div>
  </label>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps([
  'label',
  'group',
  'modelValue',
  'value',
  'id',
  'tabindex',
]);

const isChecked = computed(() => {
  return props.modelValue && props.modelValue.includes(props.value);
});

const emit = defineEmits(['update:modelValue']);

function toggleSelection(event) {
  const isChecked = event.target.checked;
  const selectedValues = props.modelValue ? [...props.modelValue] : [];

  if (isChecked && !selectedValues.includes(props.value)) {
    selectedValues.push(props.value);
  } else if (!isChecked && selectedValues.includes(props.value)) {
    const index = selectedValues.indexOf(props.value);
    selectedValues.splice(index, 1);
  }

  emit('update:modelValue', selectedValues);
}
</script>
