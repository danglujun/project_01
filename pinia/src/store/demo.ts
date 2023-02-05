import { defineStore } from 'pinia'

export const demo = defineStore('demo', {
  state: () => {
    return {
      list: ['吃饭', '逛街', '看电影']
    }
  }
})
