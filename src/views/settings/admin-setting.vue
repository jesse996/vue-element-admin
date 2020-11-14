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
        prop="date"
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
  </div>
</template>
