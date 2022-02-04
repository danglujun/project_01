<template>
  <h1>这是<i>App.Vue</i>的根组件</h1>
  <hr />
  <!-- <h3>abc---{{ username }}</h3>
  <hr />
  <p>count的值是：{{ count }}</p>
  <button @click="addCount">+1</button> -->
  <my-swiper></my-swiper>
  <my-test></my-test>
  <hr />
  <my-search></my-search>
</template>

<script>
import Search from './components/02.privateReg/Search.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      username: 'zs',
      count: 0
    }
  },
  methods: {
    addCount() {
      this.count++
    }
  },
  components: {
    MySearch: Search
  }
}
</script>

<style lang="less" scoped>
h1 {
  color: red;
  i {
    color: blue;
  }
}
</style>
