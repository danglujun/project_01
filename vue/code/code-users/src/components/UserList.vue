<template>
  <div>
    <!-- 添加新用户按钮 -->
    <el-button type="primary" @click="dialogVisible = true">添加新用户</el-button>

    <!-- 用户的表格 -->
    <el-table :data="userList" stripe border>
      <!-- 索引列 -->
      <el-table-column type="index" label="#"></el-table-column>
      <!-- 渲染用户名这一列 -->
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="头衔" prop="position"></el-table-column>
      <el-table-column label="创建时间">
        <template #default="scope">
          {{ scope.row.addtime | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <div>
            <router-link :to="'/users/' + row.id">详情</router-link>&nbsp;
            <a href="#" @click.prevent="onRemove(row.id)">删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加新用户" :visible.sync="dialogVisible" width="50%" @close="onDialogClosed">
      <!-- 添加用户的表单 -->
      <el-form :model="form" label-width="80px" :rules="formRules" ref="myAddForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="头衔" prop="position">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddNewUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    // 声明校验年龄的函数
    let checkAge = (rule, value, cb) => {
      if (!Number.isInteger(value)) {
        return cb(new Error('请填写整数！'))
      }
      if (value > 100 || value < 1) {
        return cb(new Error('年龄必须在1到100之间!'))
      }
      cb()
    }
    return {
      userList: [],
      dialogVisible: false, //控制添加对话框的显示与隐藏
      form: {
        //要采集的用户信息对象
        name: '',
        age: '',
        position: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入头衔', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取用户列表的数据
    async getUserList() {
      const { data: res } = await this.$http.get('/api/users')
      if (res.status !== 0) return console.log('用户列表数据获取失败！')
      this.userList = res.data
      // console.log(this.userList)
    },
    // 监听对话框关闭的事件
    onDialogClosed() {
      // 拿到form组件的引用，调用resetFields函数，即可重置表单
      this.$refs.myAddForm.resetFields()
    },
    // 用户点击了添加按钮
    onAddNewUser() {
      this.$refs.myAddForm.validate(async valid => {
        if (!valid) return
        // 需要执行添加的业务处理
        const { data: res } = await this.$http.post('/api/users', this.form)
        if (res.status !== 0) return this.$message.error('添加失败！')
        this.$message.success('添加成功！')
        this.dialogVisible = false
        this.getUserList()
      })
    },
    // 点击了删除的链接
    async onRemove(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message.info('取消删除！')
      const { data: res } = await this.$http.delete('/api/users/' + id)
      if (res.status !== 0) return this.$message.error('删除失败！')
      this.$message.success('删除成功！')
      this.getUserList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
