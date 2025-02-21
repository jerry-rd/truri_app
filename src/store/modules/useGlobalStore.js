import { defineStore } from 'pinia'

export default defineStore('global', {
  state: () => {
    return {
      info: null,
    }
  },
  actions: {
    setInfo(info) {
      this.info = info
    },
  },
})
