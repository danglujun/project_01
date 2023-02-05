<template>
  <div>
    {{ store.helloWorld }}
  </div>
  <div>{{ store.count }}</div>
  <div>{{ store.hidePhone }}</div>
  <hr />
  <div>{{ helloWorld }}</div>
  <div>{{ count }}</div>
  <div>{{ hidePhone }}</div>
</template>

<script setup lang="ts">
import { mainStore } from '../store/index'
import { storeToRefs } from 'pinia'
const store = mainStore()
const { helloWorld, count,hidePhone } = storeToRefs(store)
</script>

<style scoped>

</style>
