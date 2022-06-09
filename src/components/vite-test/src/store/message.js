import { defineStore } from 'pinia'

// 인수가 2개 들어감('', {})
export const useMessageStore = defineStore('message', {
  state: () => ({
    message: 'Hello Pinia!'
  }),
  getters: {
    reversedMessage(state) {
      return state.message.split('').reverse().join('')
    }
  },
  actions: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
