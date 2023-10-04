<template>
    <div class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-y-2 items-start justify-center">
        <div class="text-sm text-gray-700 dark:text-gray-400">{{ props.description}}</div>
        <div class="font-bold text-xl md:text-5xl text-gray-900 dark:text-white">
            {{ props.stat }}
        </div>
    </div>
</template>
<script setup>

import { defineProps } from 'vue';

const props = defineProps([
  'description', 'stat',
]);
</script>