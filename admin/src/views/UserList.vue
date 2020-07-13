<template>
  <div>
    <h1>用户列表</h1>
    <el-table :data="list">
      <el-table-column prop="_id" label="ID" width="220px" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/users/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return { list: [] };
  },
  methods: {
    async fetch() {
      const res = await this.axios.get("rest/users");
      this.list = res.data;
    },
    async remove(row) {
      this.$confirm(`是否要删除${row.username}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.axios.delete(`rest/users/${row._id}`);
        this.$message({ type: "success", message: "删除成功" });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
