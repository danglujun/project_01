<template>
  <div>MyAbout 组件</div>
  <hr />
  <router-link to="/about/tab1">Tab1</router-link>
  <router-link to="/about/tab2">Tab2</router-link>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'MyAbout'
}
</script>

<style></style>
