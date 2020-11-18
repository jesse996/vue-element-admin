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
        {
          id: 1,
          date: '2019-01-1',
          name: 'admin',
          option: 'add page'
        }, {
          id: 2,
          date: '2019-01-1',
          name: 'admin',
          option: 'add page'
        }
      ],
      query: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        let data = await fetchOptions(this.query)
        console.log(data)
        data = data._embedded.options
        for (const item of data) {
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
              type = '添加'; break
            case 'delete':
              type = '添加'; break
          }
          item.type = type
        }
        this.tableData = data
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
