<template>
  <header class="title">
    <div>
      <h1>Todo List</h1>
    </div>
  </header>
  <section class="container">
    <CreateTodo />
    <TodoList />
  </section>
</template>

<script>
import CreateTodo from '~/components/CreateTodo.vue'
import TodoList from '~/components/TodoList.vue'

export default {
  components: {
    CreateTodo,
    TodoList
  }
}
</script>

<style lang="scss">
body{
  height: 100vh;
  font-size: 10px;
  background-image: url('./assets/background-image.jpg');
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(30px);
  header {
    padding-top: 50px;
    &.title {
      div{
        position: relative;
        width: 250px;
        margin: 0 auto;
        h1 {
          color: #fff;
          font-size: 5em;
          font-weight: bold;
          text-align: center;
          z-index: 1;
          text-shadow: 5px 5px 2px #658dfa;
        }
      }
    }
  }
  
  .container{
  width: 90%;
  max-width: 900px;
  margin: 50px auto;
  padding: 15px 50px 30px 50px;
  background-color: #fff;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0px 3px 10px #474747;
  }
}
</style>
