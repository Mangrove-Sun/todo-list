<template>
  <div class="add-list">
    <input
      placeholder="Type your to-do"
      :value="title"
      @input="title = $event.target.value" 
      @keydown.enter="createTodo" />
    
    
    <button @click="createTodo">
      Add
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    async createTodo() {
      if ( !this.title.trim() ) return
      
      this.$store.dispatch('createTodo', this.title.trim())
      this.title = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.add-list{
  display: flex;
  padding: 20px 0;
  width: 70%;
  margin: 0 auto;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  input {
      position: relative;
      width: 100%;
      padding: 10px;
      font-size: 1.7em;
      border: none;
      border-bottom: 2px solid #000;
      background: none;
      box-sizing: border-box;
      outline: none;
  }
  button {
    margin-left: 15px;
    width: 90px;
    height: 35px;
    background-color: transparent;
    border: none;
    border-radius: 20px;
    box-shadow: 0px 1px 3px #658dfa;
    outline: none;
    cursor: pointer;
  }
}
</style>
