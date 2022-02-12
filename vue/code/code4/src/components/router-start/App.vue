<template>
  <div>vue-router的基本使用</div>
  <router-link to="/home">首页</router-link>&nbsp; <router-link to="/movie/1">电影1</router-link>&nbsp; <router-link to="/movie/2">电影2</router-link>&nbsp; <router-link to="/movie/3">电影3</router-link>&nbsp;
  <router-link to="/about">关于</router-link>
  <hr />
  <router-view></router-view>
</template>

<script>
export default {
  name: 'MyApp'
}
</script>

<style></style>
