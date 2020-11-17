<template>
  <div class="app-container">
    <el-button class="add-admin-btn" type="primary" @click="dialogFormVisible=true">添加管理员</el-button>
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="id"
        label="编号"
        width="180"
      />
      <el-table-column
        prop="name"
        label="管理员名称"
        width="180"
      />
      <el-table-column
        prop="tel"
        label="联系电话"
      />
      <el-table-column
        prop="addedDate"
        label="添加日期"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">切换选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" required prop="username">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" required prop="tel">
          <el-input v-model="form.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" required prop="password">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" required prop="role">
          <el-input v-model="form.role" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { getUserList } from '@/api/user'
export default {
  data() {
    return {
      tableData: [
      //   {
      //   id: 1,
      //   name: 'admin',
      //   tel: '186xxxxx',
      //   addedDate: '2018-01-01'
      // }, {
      //   id: 2,
      //   name: 'admin2',
      //   tel: '186xxxxx',
      //   addedDate: '2018-01-01'
      // }
      ],
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        roles: '',
        tel: ''
      },
      formLabelWidth: '120px'
    }
  },
  async created() {
    this.getData()
  },
  methods: {
    getData() {
      getUserList().then(data => {
        console.log(data)
      }).catch(e => {
        console.log(e)
      })
    },
    addAdmin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('valide')
          this.$refs.form.resetFields()
          this.dialogFormVisible = false
          // TODO:添加管理员api
        } else {
          alert('请输入完整信息！')
        }
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.add-admin-btn{
    display: float;
    float: right;
}
</style>
