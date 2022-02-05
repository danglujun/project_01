<template>
  <div>
    <h3>watch 侦听器的用法</h3>
    <input type="text" class="form-control" v-model.trim="username" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyWatch',
  data() {
    return {
      username: 'admin',
      info: {
        username: 'zs',
        age: 20
      }
    }
  },
  watch: {
    username: {
      async handler(newVal) {
        const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal)
        console.log(res)
      },
      // 立即触发 watch 侦听器
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.form-control {
  width: 400px;
}
</style>
