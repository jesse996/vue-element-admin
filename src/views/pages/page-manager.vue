<template>
  <div class="app-container">
    <el-button class="add-page-btn" type="primary" @click="dialogFormVisible=true">添加页面</el-button>
    <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      :data="tableData"
      stripe
      style="width: 100%"
      :default-sort="{prop: 'order', order: 'descending'}"
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
        prop="orderValue"
        label="排序"
        sortable
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
        <el-form-item label="排序" :label-width="formLabelWidth" required prop="orderValue">
          <el-input v-model.number="form.orderValue" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddPage">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改页面" :visible.sync="editDialogFormVisible">
      <el-form ref="form" :model="editForm">
        <el-form-item label="页面名称" :label-width="formLabelWidth" required prop="name">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth" required prop="alias">
          <el-input v-model="editForm.alias" autocomplete="off" />
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth" required prop="link">
          <el-input v-model="editForm.link" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth" required prop="orderValue">
          <el-input v-model.number="editForm.orderValue" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdatePage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchPages, addPage, deletePage, updatePage } from '@/api/page'

export default {
  name: 'PageManager',
  data() {
    return {
      tableData: [
      //   {
      //   name: '改革先锋',
      //   alias: 'about',
      //   link: 'http://www.abc.com/about',
      //   order: 10
      // }, {
      //   name: '改革先锋',
      //   alias: 'about',
      //   link: 'http://www.abc.com/about',
      //   order: 120
      // }, {
      //   name: '改革先锋',
      //   alias: 'about',
      //   link: 'http://www.abc.com/about',
      //   order: 30
      // }
      ],
      multipleSelection: [],
      dialogFormVisible: false,
      editDialogFormVisible: false,
      form: {
        name: '',
        alias: '',
        link: '',
        orderValue: 0
      },
      editForm: {
        name: '',
        alias: '',
        link: '',
        orderValue: 0
      },
      formLabelWidth: '120px',
      query: {
        // page: 0,
        // size: 10
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleDelete(index, row) {
      console.log('row.id:', row.id)
      deletePage(row.id).then(data => {
        console.log(data)
        this.getData()
      }).catch(e => {
        console.log(e)
      })
    },
    handleAddPage() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // alert('valide')
          console.log(JSON.stringify(this.form))
          addPage(Object.assign({}, this.form)).then(data => {
            this.getData()
          }).catch(e => {
            alert('add failed')
          })
          this.$refs.form.resetFields()
          this.dialogFormVisible = false
        } else {
          alert('invalide')
        }
      })
    },
    handleEdit(index, row) {
      this.editDialogFormVisible = true
      this.editForm = row
      console.log(index, row)
    },
    handleUpdatePage() {
      updatePage(this.editForm).then(data => {
        console.log('update page success')
        console.log(data)
      }).catch(e => {
        console.log('update page failed')
        alert('failed:' + JSON.stringify(e))
      })
      this.editDialogFormVisible = false
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
    deleteSelection() {
      const res = []
      for (const page of this.multipleSelection) {
        res.push(deletePage(page.id))
      }
      Promise.all(res)
        .then(res => {
          console.log(JSON.stringify(res))
        }).catch(e => {
          alert('deleteSelection failed')
        })
      this.getData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getData() {
      fetchPages(this.query).then(data => {
        this.tableData = data._embedded.pageInfoes
      }).catch(e => {
        alert('[page-manager]error:' + JSON.stringify(e))
      })
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
