<template>
  <ul
    ref="todoList"
    class="todo-lists">
    <TodoItem
      v-for="todo in todos"
      :id="todo.id" 
      :key="todo.id"
      :todo="todo"
      @update-title="todo.title = $event" />
  </ul>
</template>

<script>
import TodoItem from '~/components/TodoItem.vue'
import Sortable from 'https://cdn.skypack.dev/sortablejs'

export default {
  components: {
    TodoItem
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  created() {
    this.readTodos()
    
  },
  mounted() {
    this.initSortable()
  },
  methods: {
    async readTodos() {
      this.$store.dispatch('readTodos')
    },
    initSortable() {
      new Sortable(this.$refs.todoList, {
        handle: 'li .handle', // 드래그 핸들이 될 요소의 선택자를 입력합니다.
        delay: 50, // 클릭이 밀리는 것을 방지하기 위해 약간의 지연 시간을 추가합니다.
        animation: 350, // 정렬할 때 애니메이션 속도(ms)를 지정합니다.
        forceFallback: true, // 다양한 환경의 일관된 Drag&Drop(DnD)을 위해 HTML5 기본 DnD 동작을 무시하고 내장 기능을 사용합니다.
        // 요소의 DnD가 종료되면 실행할 핸들러(함수)를 지정합니다.
        onEnd: event => {
          this.reorderTodos(event)
        }
      })
    },
    reorderTodos(event) {
      this.$store.dispatch('orderChange', event)
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  border-top: 1px solid #ddd;
  box-sizing: border-box;
}
</style>
