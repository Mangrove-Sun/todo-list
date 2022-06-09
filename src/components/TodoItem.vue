<template>
  <li>
    <div class="handle">
      <span class="material-icons">
        drag_indicator
      </span>
    </div>
    <!-- <input
      type="checkbox"
      :checked="todo.done"
      class="todo-check" /> -->
    <span
      v-if="!editMode"
      class="todo-title">
      {{ todo.title }}
    </span>
    <template v-if="!editMode">
      <button
        class="btn btn-edit"
        @click.stop="onEditMode">
        Edit
      </button>
      <button
        class="btn btn-del"
        @click="deleteTodo">
        Del
      </button>
    </template>
    <template v-else>
      <div
        class="input-wrap"
        @click.stop>
        <input
          ref="titleInput"
          class="title-edit-mode"
          :value="todo.title"
          @input="inputTitle" 
          @keydown.enter="offEditMode(); updateTitle()"
          @keydown.esc="offEditMode" />
        <button
          class="btn btn-apply"
          @click="offEditMode(); updateTitle()">
          Apply
        </button>
        <button
          class="btn btn-cancel"
          @click="offEditMode">
          Cxl
        </button>
      </div>
    </template>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // title: '컴포넌트',
      editMode: false
    }
  },
  methods: {
    async onEditMode() {
      this.editMode = true
      window.addEventListener('click', this.offEditMode)
      await this.$nextTick()
      this.$refs.titleInput.focus()
    },
    offEditMode() {
      this.editMode = false
      window.removeEventListener('click', this.offEditMode)
    },
    inputTitle(event) {
      // 부모컴포넌트한테 소리지르는 느낌 (요청)
      this.$emit('update-title', event.target.value)
    },
    async deleteTodo() {
      this.$store.dispatch('deleteTodo', this.todo)
    },
    async updateTitle() {
      this.$store.dispatch('updateTitle', {
        id: this.todo.id,
        title: this.todo.title,
        done: this.todo.done,
        order: this.todo.order
      }) 
    },
    async timeForToday(value) {
      const res = this.$store.dispatch('timeForToday', value)
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  margin: 5px 0;
  padding: 10px 0px;
  font-size: 1.6em;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  &.sortable-ghost{
    opacity: 0;
  }
  &.sortable-drag{
    opacity: 1 !important;
    background-color: #d5e0ff;
  }
  .handle{
    opacity: 0;
    cursor: grab;
    .material-icons {
      color: #777;
      font-size: 1.6em;
    }
  }
  &:hover {
    // background-color: #d6d6d6;
    .handle {
      opacity: 0.6;
    }
  }
  .todo-check {
    margin: 0 10px;
  }
  .todo-title {
    padding-left: 5px;
    flex-grow: 1;
  }
  .btn {
    margin-right: 10px;
    padding: 5px 10px;
    background-color: transparent;
    border: none;
    border-radius: 20px;
    outline: none;
    cursor: pointer;
    &.btn-edit:hover {
      color: #a55b2a;
    }
    &.btn-del:hover {
      color: red;
    }
    &.btn-apply:hover {
      color: #658dfa;
    }
    &.btn-cancel:hover {
      color: red;
    }
  }
  div.input-wrap {
    display: flex;
    flex-grow: 1;
    .title-edit-mode{
      flex-grow: 1;
      width: 100%;
      padding: 5px;
      font-size: 1em;
      border: none;
      border-bottom: 1px solid #000;
      background: none;
      box-sizing: border-box;
      outline: none;
  }
  }
}
</style>
