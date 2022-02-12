<template>
  <div>MyMovie 组件---{{ $route.params.id }}---{{ id }}</div>
  <button type="button" class="btn btn-primary" @click="goBack">后退</button>
</template>

<script>
export default {
  name: 'MyMovie',
  props: ['id'],
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style></style>
