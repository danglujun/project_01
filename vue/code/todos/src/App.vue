<template>
  <div>
    <h1>App根组件</h1>
    <hr />
    <todo-input @add="onAddNewTask"></todo-input>
    <todo-list :list="tasklist" class="mt-2"></todo-list>
    <todo-button v-model:active="activeBtnIndex"></todo-button>
  </div>
</template>

<script>
// 导入TodoList组件
import TodoList from './components/todo-list/TodoList.vue'
import TodoInput from './components/todo-input/TodoInput.vue'
import TodoButton from './components/todo-button/TodoButton.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      // 任务列表的数据
      todolist: [
        { id: 1, task: '周一早晨9点开会', done: false },
        { id: 2, task: '周一晚上8点聚餐', done: false },
        { id: 3, task: '准备周三上午的演讲稿', done: true }
      ],
      nextId: 4,
      activeBtnIndex: 0
    }
  },
  computed: {
    tasklist() {
      switch (this.activeBtnIndex) {
        case 0:
          return this.todolist
        case 1:
          return this.todolist.filter(x => x.done)
        case 2:
          return this.todolist.filter(x => !x.done)
      }
    }
  },
  components: {
    TodoList,
    TodoInput,
    TodoButton
  },
  methods: {
    onAddNewTask(taskname) {
      this.todolist.push({
        id: this.nextId,
        task: taskname,
        done: false
      })
      this.nextId++
    }
  }
}
</script>

<style lang="less" scoped></style>
