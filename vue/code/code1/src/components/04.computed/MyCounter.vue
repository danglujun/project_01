<template>
  <input type="text" v-model.number="count" />
  <p>{{ count }}乘以2的值是：{{ plus }}</p>
</template>

<script>
export default {
  name: 'MyCounter',
  data() {
    return {
      count: 1
    }
  },
  computed: {
    plus() {
      return this.count * 2
    }
  }
}
</script>

<style></style>
