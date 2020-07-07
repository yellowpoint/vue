<template>
<section class="todoapp">
  <header class="header">
    <h1>Vue3 todos</h1>
    <input class="new-todo"
      placeholder="想干的事"
      v-model="newTodo"
      @keyup.enter="addTodo">
  </header>
  <section class="main" v-show="todos.length" >
    <ul class="todo-list">
      <li v-for="todo in todos"
        class="todo"
        :key="todo.id"
        >
        <div class="view">
          <label>{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
      </li>
    </ul>
  </section>

</section>
</template>

<script>
import {ref,reactive,toRefs} from 'vue'
export default {
  setup(){
    const state = reactive({
      newTodo:'',
      todos: [
        { id: "1", title: "吃饭", completed: false },
        { id: "2", title: "睡觉", completed: false }
      ],
    })
    function addTodo(){
      var value = state.newTodo && state.newTodo.trim()
      if (!value) {
        return
      }
      state.todos.push({
        id: state.todos.length + 1,
        title: value,
        completed: false
      })
      state.newTodo = ""
    }
    return {
      ...toRefs(state),
      addTodo
    }
  }
}
</script>