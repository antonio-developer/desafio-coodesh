<template>
  <main>
    <section class="container max-w-3xl mx-auto pt-5 px-5 lg:pt-8 2xl:pt-16">
      <div class="relative mt-5 mb-7">
        <input
          type="text"
          class="font-medium bg-slate-700 outline-none focus:border-slate-500 font-sans px-3 border border-slate-600 py-2 w-full rounded-md text-slate-300 placeholder:text-slate-400/60"
          placeholder="Search patient name"
          v-model="search"
          @input="searchPatient"
        />
        <DocumentSearchIcon class="absolute top-2.5 right-2 w-5 h-5 text-slate-400 lg"/>
      </div>

      <PatientTable :patientsData="fakePatientsList" @getPatient="handlePatientInfos" />

      <Transition name="infos">
        <PatientInfoModal v-if="isOpen" :patientInfo="patientInfo" :patientId="indexID" :closeModal="closeModal" />
      </Transition>

      <LoadMoreButton :loading="requestStatus" @click="loadMorePatients" />
    </section>
  </main>
</template>

<script setup>
import { computed, reactive, ref, watch, watchEffect } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { DocumentSearchIcon } from '@heroicons/vue/outline';
import PatientTable from './Table.vue';
import PatientInfoModal from './Modal.vue';
import usePatientStore from '../store/PatientStore.js';
import LoadMoreButton from './LoadMore.vue';

const PatientStore = usePatientStore();
const route = useRoute();

// status helpers
let isOpen = ref(false);
let requestStatus = ref(true);

let patients = reactive([]);
let fakePatientsList = ref([]);
let patientInfo = ref({});
let indexID = ref(null);
let search = ref(null);
let page = 1;
let routeId = ref(null);

patients = computed(() => PatientStore.patientsList);
watchEffect(() => {
  fakePatientsList.value = patients.value;
});
routeId.value = route.params.id;

function getPatientList() {
  requestStatus.value = true;

  PatientStore.getPatients(page)
    .then(({ data }) => {
      requestStatus.value = false;

      if (page === 1) PatientStore.patientsList = [];

      let patientList = data.results;
      patientList.forEach((patient) => PatientStore.fillList(patient));
    })
    .catch((error) => {
      requestStatus.value = false;
      console.log(error);
    });
}

function loadMorePatients() {
  page++;
  getPatientList();
}

function searchPatient() {
  if (!search.value || search.value === '') return getPatientList();

  fakePatientsList.value = PatientStore.search(search.value);
}

function handlePatientInfos(obj) {
  patientInfo.value = obj.patient;
  indexID.value = obj.index;
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

getPatientList();

</script>

<style>
@media (min-width: 1024px) {
  main {
    height: 110vh;
  }
}

.infos-enter-active,
.infos-leave-active {
  transition: opacity 0.5s ease;
}

.infos-enter-from,
.infos-leave-to {
  opacity: 0;
}
</style>
