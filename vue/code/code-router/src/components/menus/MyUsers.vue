<template>
  <!-- 标题 -->
  <h4 class="text-center">用户管理</h4>

  <!-- 用户列表 -->
  <table class="table table-bordered table-striped table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>头衔</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in userlist" :key="item.id">
        <td>{{ i + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.position }}</td>
        <td>
          <router-link :to="'/home/users/' + item.id">详情</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'MyUser',
  data() {
    return {
      // 用户列表数据
      userlist: [
        { id: 1, name: '嬴政', age: 18, position: '始皇帝' },
        { id: 2, name: '李斯', age: 35, position: '丞相' },
        { id: 3, name: '吕不韦', age: 50, position: '商人' },
        { id: 4, name: '赵姬', age: 48, position: '王太后' }
      ]
    }
  }
}
</script>

<style lang="less" scoped></style>
