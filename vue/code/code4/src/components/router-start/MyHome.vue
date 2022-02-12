<template>
  <div>MyHome 组件</div>
  <button class="btn btn-primary" @click="goToMovie(3)">导航到Movie页面</button>
  <router-link :to="{ name: 'mov', params: { id: 1 } }">go to movie</router-link>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'MyHome',
  methods: {
    goToMovie(id) {
      // this.$router.push('/movie/' + id)
      this.$router.push({ name: 'mov', params: { id: 3 } })
    }
  }
}
</script>

<style></style>
