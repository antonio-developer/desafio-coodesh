<template>
  <div class="shadow-md rounded overflow-hidden shadow-slate-700 relative side__infos">
    <table class="table-fixed lg:table-auto w-full">
      <thead class="relative">
        <tr class="bg-slate-700 bg-opacity-90 sticky top-0 text-xs uppercase text-slate-200/70">
          <th @click="orderName" class="p-0 m-0 w-44">
            <button
              class="flex items-center justify-between w-full hover:bg-slate-600 py-1 px-5 text-xs uppercase font-bold"
            >
              <span>Name</span>
              <SwitchVerticalIcon class="w-5 h-5" />
            </button>
          </th>
          <th class="w-32">Gender</th>
          <th class="w-32">Birth</th>
          <th class="text-center w-32">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(patient, index) in patientsData"
          :key="index"
          class="hover:bg-slate-500 bg-slate-600 text-sm even:border-y even:border-slate-700/50 text-slate-300"
        >
          <td class="w-44">
            <span class="truncate">
              {{ `${patient.name.first} ${patient.name.last}` }}
            </span>
          </td>
          <td>{{ patient.gender }}</td>
          <td>{{ new Date(patient.dob.date).toLocaleDateString() }}</td>
          <td class="text-center py-2">
            <button
              @click="showPatientInfo(patient, index)"
              class="px-5 bg-slate-800 text-slate-200 rounded-md shadow shadow-slate-600"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { SwitchVerticalIcon } from '@heroicons/vue/solid';
import usePatientStore from '../store/PatientStore';

const PatientStore = usePatientStore();
const emit = defineEmits(['getPatient']);

const props = defineProps({
  patientsData: {
    type: Array,
    default: [],
  },
});

let order = ref(true);

function showPatientInfo(patient, index) {
  emit('getPatient', { patient, index });
}

function compare(a, b) {
  const nameA = a.name.first.toLowerCase();
  const nameB = b.name.first.toLowerCase();

  let comparison = 0;

  if (nameA > nameB) comparison = 1;
  else if (nameA < nameB) comparison = -1;

  return order.value ? comparison : comparison * -1;
}

function orderName() {
  PatientStore.orderByName(compare);
  order.value = !order.value;
}
</script>
