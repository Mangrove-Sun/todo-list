<template>
  <h1>About!</h1>
  <RouterLink to="/about/name">
    Name~
  </RouterLink>
  <RouterView />
  <div>{{ messageStore.message }}</div>
  <div>{{ messageStore.reversedMessage }}</div>
  <button @click="messageStore.reverseMessage">
    Reverse!!
  </button>
</template>

<script>
import { mapStores } from 'pinia'
import { useMessageStore } from '~/store/message'

export default {
  computed: {
    ...mapStores([useMessageStore])
  }
}
</script>
