import { defineStore } from 'pinia'
import { demo } from './demo'

export const mainStore = defineStore('main', {
  state: () => {
    return {
      helloWorld: 'hello world!',
      count: 0,
      phone: '17366009613'
    }
  },
  getters: {
    hidePhone(state) {
      return state.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    }
  },
  actions: {
    changeState() {
      this.count += 4
      this.helloWorld = 'Demo'
    },
    getList() {
      console.log(demo().list)
    }
  }
})
