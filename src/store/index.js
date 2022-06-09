import { createStore } from 'vuex'
import axios from 'axios'

const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const headers = {
  'Content-Type': 'application/json',
  apikey: 'FcKdtJs202204',
  username: 'KDT2_ParkSunHong'
}

export default createStore({
  namespaced: true,
  state() {
    return {
      todos: [],
      order: 0
    }
  },
  mutations: {
    setTodos(state, payload) {
      state.todos = payload
      // console.log(this.todos)
    },
    addTodoList(state, todo) {
      state.todos.push(todo.data)
    },
    reorderTodos(state, {oldIndex, newIndex}) {
      const clone = { ...state.todos[oldIndex] }
      state.todos.splice(oldIndex, 1)
      state.todos.splice(newIndex, 0, clone)
      console.log(`Order ${oldIndex} -> ${newIndex}`)
    },
    deleteData(state, todoId) {
      const index = state.todos.findIndex(todo => todo.id === todoId )
      state.todos.splice(index,1)
    }
  },
  actions: {
    async createTodo({ state, commit }, title) {
      state.order = state.todos.length + 1
      const res = await axios({
        url: END_POINT,
        method: 'POST',
        headers,
        data: {
          title,
          order: state.order
        }
      })
      
      commit('addTodoList', res)
      console.log('Add:', res.data.title)
    },
    async readTodos({ commit }) {
      const res= await axios({
        url: END_POINT,
        method: 'GET',
        headers
      })

      console.log('ReadTodos', res.data)
      commit('setTodos', res.data)
    },
    async updateTitle(context, payload) {
      const { id, title, done, order} = payload
      const res = await axios({
        url: `${END_POINT}/${id}`,
        method: 'PUT',
        headers,
        data: {
          title,
          done,
          order
        }
      })
      console.log('Update Title: ', res.data.title)
    },
    async deleteTodo({ commit, dispatch }, todo){
      commit('deleteData', todo.id)
      await axios({
        url: `${END_POINT}/${todo.id}`,
        method: 'DELETE',
        headers
      })
      console.log('Delete', todo)
      dispatch('orderChange')
    },
    async orderChange({ state, commit }, event){
      if ( event !== undefined ){
        if ( event.oldIndex === event.newIndex ) return console.log('No Change')
        commit('reorderTodos', event)
        // console.log(event)
      }
      
      const todoIds = state.todos.map(todo => todo.id)
      await axios({
        url: `${END_POINT}/reorder`,
        method: 'PUT',
        headers,
        data: {
          todoIds
        }
      })
    }
  }
})
