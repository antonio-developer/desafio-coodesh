<template>
  <section @click.self="closeModal" class="fixed inset-0 bg-slate-900/50 flex justify-center items-center">
    <div class="p-8 rounded-md relative bg-slate-300 shadow shadow-slate-400">
      <button @click="closeModal" class="absolute top-5 right-5">
        <XIcon class="w-5 h-5 text-slate-500 hover:text-slate-800"/>
      </button>
      <div class="max-w-[130px] rounded-full mx-auto -mt-24 mb-3">
        <img class="max-w-full rounded-full h-auto shadow shadow-slate-600" :src="patientInfo.picture.large" alt="description" loading="lazy" >
      </div>
      <div class="text-slate-800">
        <div class="mb-5 text-center">
          <h1 class="font-semibold text-sm lg:text-lg text-slate-800">{{ `${patientInfo.name.first} ${patientInfo.name.last}` }}</h1>
          <p class="text-sm text-slate-700">{{ patientInfo.email }}</p>
        </div>
        <div class="flex gap-8 items-center text-sm">
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">Gender</span>  
            <p>{{ patientInfo.gender }}</p>  
          </div>
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">Birth</span>  
            <p>{{ new Date(patientInfo.dob.date).toLocaleDateString() }}</p>
          </div>
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">Nationality</span>  
            <p>{{ patientInfo.nat }}</p>
          </div>
        </div>
        <div class="flex gap-8 items-center mt-5 text-sm">
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">Cell</span>  
            <p>{{ patientInfo.cell }}</p>
          </div>
          <div>
            <span class="text-xs uppercase font-bold text-slate-500">ID</span>  
            <p>
              {{ patientInfo.id.name || '' }} 
              <span v-if="patientInfo.id.name"> - </span> 
              <span v-else>Absent</span>
              {{ patientInfo.id.value || '' }}
            </p>
          </div>
        </div>
        <div class="mt-5">
          <span class="text-xs uppercase font-bold text-slate-500">Address</span>  
          <p class="text-sm">{{ `${patientInfo.location.street.name}, ${patientInfo.location.street.number} - ${patientInfo.location.city} ${patientInfo.location.state}` }}</p>
        </div>
        <div class="text-xs mt-5">
          <span class="text-xs uppercase font-bold text-slate-500">Profile Link</span>  
          <a target="_blank" class="flex text-sm gap-3 items-center" :href="`http://localhost:3000/patient/${patientId}`">
            {{ `http://localhost:3000/patient/${patientId}` }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { XIcon } from '@heroicons/vue/outline';

const props = defineProps({
  patientInfo: {
    type: Object,
    default: {}
  },
  closeModal: {
    type: Function,
    default: Function
  },
  patientId: {
    type: Number,
    default: -1
  }
})

console.log(props.patientInfo[2])
</script>