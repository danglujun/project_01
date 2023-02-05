<template>
  <div>
    <button @click="handleClick">修改状态数据(1)</button>
    <button @click="handleClickPatch">修改状态数据(2)</button>
    <button @click="handleClickMethod">修改状态数据(3)</button>
    <button @click="handleClickActions">修改状态数据(4)</button>
    <button @click="getList">获取数据</button>
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '../store'
const store = mainStore()
// 第一种
const handleClick = () => {
  store.count++
}
// 第二种
const handleClickPatch=() => {
  store.$patch({
    count:store.count+2,
    helloWorld:store.helloWorld=== 'hello world!' ? 'Demo' : 'hello world!'
  })
}
// 第三种
const handleClickMethod=() => {
  store.$patch((state) => {
    state.count=state.count+3
    state.helloWorld=state.helloWorld=== 'hello world!' ? 'Demo' : 'hello world!'
  })
}
const handleClickActions=() => {
  store.changeState()
}
const getList=() => {
  store.getList()
}
</script>

<style scoped>

</style>
