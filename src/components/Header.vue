<template>
  <header class="flex justify-between items-center py-2 px-3 lg:px-6 bg-sky-900">
    <div class="flex items-center gap-3">
      <router-link to="/" class="w-10 h-10 lg:w-14 lg:h-14">
        <img
          class="w-full object-contain rounded-full"
          src="../assets/logo.png"
          alt="Company Logo Image"
          loading="lazy"
        />
        <span class="sr-only">
          Company logo image. Click to go to home page.
        </span>
      </router-link>
      <h1 class="font-bold text-md lg:text-xl 2xl:text-2xl text-slate-50">Pharma</h1>
    </div>
    <button class="bg-slate-200 text-slate-700 rounded-full w-10 h-10 lg:w-12 lg:h-12 hover:bg-slate-300">
      <UserIcon class="w-5 h-5 mx-auto" />
    </button>
  </header>
</template>
<script setup>
import { UserIcon } from "@heroicons/vue/outline";
</script>
