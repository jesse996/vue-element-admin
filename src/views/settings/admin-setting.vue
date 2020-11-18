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
        prop="username"
        label="管理员名称"
        width="180"
      />
      <el-table-column
        prop="tel"
        label="联系电话"
      />
      <el-table-column
        prop="createAt"
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
      <el-button v-show="multipleSelection.length>0" type="danger" @click="deleteSelection()">删除选择</el-button>
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
          <el-input v-model="form.password" autocomplete="off" show-password />
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" required prop="role">
          <!-- <el-input v-model="form.role" autocomplete="off" /> -->
          <el-select v-model="form.role" placeholder="角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑管理员" :visible.sync="editDialogFormVisible">
      <el-form ref="form" :model="editForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" required prop="username">
          <el-input v-model="editForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" required prop="tel">
          <el-input v-model="editForm.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" required prop="password">
          <el-input v-model="editForm.password" autocomplete="off" show-password disabled />
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" required prop="role">
          <!-- <el-input v-model="form.role" autocomplete="off" /> -->
          <el-select v-model="editForm.role" placeholder="角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { getUserList, addUser, deleteUser, updateUser } from '@/api/user'
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
      roleOptions: [
        {
          value: 'ROLE_admin',
          label: '超级管理员'
        },
        {
          value: 'ROLE_editor',
          label: '管理员'
        }
      ],
      multipleSelection: [],
      dialogFormVisible: false,
      editDialogFormVisible: false,
      form: {
        username: '',
        password: '',
        roles: '',
        tel: ''
      },
      editForm: {
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
    async handleDelete(index, row) {
      console.log('row.id:', row.id)
      try {
        await deleteUser(row.id)
        await this.getData()
      } catch (e) {
        console.log(e)
      }
    },
    getData() {
      getUserList().then(data => {
        // console.log(data)
        this.tableData = data._embedded.users
        for (const user of this.tableData) {
          const createAt = user.createAt
          // const updateAt = user.updateAt
          user.createAt = new Date(createAt).toLocaleDateString() + ' ' + new Date(createAt).toLocaleTimeString()
          // user.updateAt = new Date(updateAt).toLocaleDateString()
        }
      }).catch(e => {
        console.log(e)
      })
    },
    handleAddUser() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addUser(Object.assign({}, this.form)).then(data => {
            console.log(data)
            // alert('添加用户成功')
            this.getData()
          }).catch(e => {
            alert('添加用户失败')
          })
          this.$refs.form.resetFields()
          this.dialogFormVisible = false
        } else {
          alert('请输入完整信息！')
        }
      })
    },
    async handleUpdateUser() {
      try {
        const data = await updateUser(this.editForm)
        console.log(data)
        await this.getData()
      } catch (e) {
        console.log(e)
      }
      this.editDialogFormVisible = false
    },
    handleEdit(index, row) {
      this.editDialogFormVisible = true
      this.editForm = {
        id: row.id,
        username: row.username,
        tel: row.tel,
        role: row.role
      }
      console.log(index, row)
    },
    async deleteSelection() {
      const res = []
      for (const user of this.multipleSelection) {
        res.push(deleteUser(user.id))
      }
      Promise.all(res)
        .then(res => {
          console.log(JSON.stringify(res))
        }).catch(e => {
          alert('deleteSelection failed')
        })
      await this.getData()
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
