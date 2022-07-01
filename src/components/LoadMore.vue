<template>
  <button 
    class="
      my-5 mx-auto text-xs md:text-sm flex items-center gap-2 text-medium text-slate-200 bg-indigo-600 shadow shadow-indigo-500 py-1 px-3 mb-5 rounded-md 
      hover:bg-indigo-700
      disabled:opacity-60 disabled:cursor-not-allowed
    "
    :disabled="loading"
  >
    <LoadingSpinner v-if="loading" />
    <PlusIcon v-else class="w-4 h-4 lg:w-5 lg:h-5" />
    <span>Load more</span>
  </button>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/outline';
import LoadingSpinner from './Spinner.vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
