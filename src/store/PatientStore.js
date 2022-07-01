import { defineStore } from 'pinia'
import request from '../http'

const usePatientStore = defineStore('usePatientStore', {
  state: () => {
    return {
      patientsList: []
    }
  },
  actions: {
    async getPatients (page) {
      return request.get(`?page=${page}&results=10&seed=foobar`)
    },
    fillList (data) {
      this.patientsList.push(data)
    },
    search (search) {
      let results = []

      let names = this.patientsList.map(patient => {
        return `${patient.name.first} ${patient.name.last}`
      })
      
      for (let index = 0; index < names.length; index++) {
        if (names[index].toLowerCase().search(search.toLowerCase()) >= 0) {
          results.push(this.patientsList[index])
        }
      }
      
      return results
    },
    orderByName(compare) {
      this.patientsList.sort(compare)
    }
  }
})

export default usePatientStore
