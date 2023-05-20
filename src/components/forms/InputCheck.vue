<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :placeholder="props.placeholder"
      :name="props.group"
      :id="props.value"
      :value="props.value"
      :checked="isChecked"
      @change="toggleSelection"
      :tabindex="props.tabindex"
      class="relative select-none float-left w-[24px] h-[24px] min-w-[24px] min-h-[24px] cursor-pointer appearance-none rounded bg-white border-2 border-solid border-gray-300 after:absolute after:z-[1] after:block after:h-5 after:w-5 after:rounded-md after:content-[''] after:shadow-md checked:border-cyan-600 checked:bg-white checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-cyan-600 checked:after:bg-cyan-600 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] checked:text-cyan-600 focus:shadow-none focus:outline-none focus:ring-0 checked:focus:border-cyan-600"
    />
    <label :for="props.value" class="w-full py-2 pl-3 cursor-pointer select-none">
      {{ props.label }}
    </label>
  </div>
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
