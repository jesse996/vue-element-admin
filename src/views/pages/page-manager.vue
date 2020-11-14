<template>
  <div class="app-container">
    <el-button class="add-page-btn" type="primary" @click="dialogFormVisible=true">添加页面</el-button>
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
        prop="name"
        label="页面名称"
        width="180"
      />
      <el-table-column
        prop="alias"
        label="别名"
        width="180"
      />
      <el-table-column
        prop="link"
        label="链接地址"
      />
      <el-table-column
        prop="order"
        label="排序"
        sortable="true"
        sort-by="order"
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

    <el-dialog title="添加页面" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="页面名称" :label-width="formLabelWidth" required prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth" required prop="alias">
          <el-input v-model="form.alias" autocomplete="off" />
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth" required prop="link">
          <el-input v-model="form.link" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" required prop="order">
          <el-input v-model="form.order" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PageManager',
  data() {
    return {
      tableData: [{
        name: '改革先锋',
        alias: 'about',
        link: 'http://www.abc.com/about',
        order: 10
      }, {
        name: '改革先锋',
        alias: 'about',
        link: 'http://www.abc.com/about',
        order: 10
      }, {
        name: '改革先锋',
        alias: 'about',
        link: 'http://www.abc.com/about',
        order: 10
      }],
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        name: '',
        alias: '',
        link: '',
        order: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    addPage() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('valide')
          this.$refs.form.resetFields()
          this.dialogFormVisible = false
        } else {
          alert('invalide')
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
.add-page-btn{
    display: float;
    float: right;
}
</style>
