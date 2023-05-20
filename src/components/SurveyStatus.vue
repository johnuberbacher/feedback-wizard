<template>
    <div>
      <div
        v-if="props.status == 'active'"
        class="w-auto py-2 px-3 rounded-lg font-medium text-sm text-lime-800 bg-lime-200 capitalize">
        {{ props.status }}
      </div>
      <div
        v-if="props.status == 'inactive'"
        class="w-auto py-2 px-3 rounded-lg font-medium text-sm text-red-700 bg-red-200 capitalize">
        {{ props.status }}
      </div>
    </div>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps(["status"]);
</script>
