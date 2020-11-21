<template>
  <div class="app-container">
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
        prop="createAt"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="username"
        label="操作人"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="name"
        label="操作"
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
    <el-pagination
      background
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(tableData)">切换选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { fetchOptions } from '@/api/option'
export default {
  data() {
    return {
      tableData: [
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  computed: {
    query() {
      return {
        page: this.currentPage - 1,
        size: this.pageSize
      }
    }

  },
  created() {
    this.getData()
  },
  methods: {
    handleSizeChange() {
      this.getData()
    },
    handleCurrentChange() {
      this.getData()
    },
    async getData() {
      try {
        const data = await fetchOptions(this.query)
        console.log(data)
        const options = data._embedded.options
        for (const item of options) {
          const createAt = item.createAt
          const date = new Date(createAt)
          item.createAt = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
          let type = item.type
          switch (type) {
            case 'get':
              type = '查询'; break
            case 'post':
              type = '添加'; break
            case 'put':
              type = '修改'; break
            case 'patch':
              type = '修改'; break
            case 'delete':
              type = '删除'; break
          }
          item.type = type
        }
        this.tableData = options

        this.total = data.page.totalElements
      } catch (e) {
        console.log(e)
      }
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
