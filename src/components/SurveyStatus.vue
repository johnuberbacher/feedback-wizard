<template>
    <div>
      <div
        v-if="props.status == 'active'"
        class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-200 capitalize">
        {{ props.status }}
      </div>
      <div
        v-if="props.status == 'inactive'"
        class="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 capitalize">
        {{ props.status }}
      </div>
    </div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps(["status"]);
</script>
