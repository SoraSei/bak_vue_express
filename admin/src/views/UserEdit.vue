<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}用户</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: { id: {} },
  data() {
    return { model: {} };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.axios.put(`rest/users/${this.id}`, this.model);
      } else {
        await this.axios.post("rest/users", this.model);
      }
      this.$router.push("/users/list");
      this.$message({ type: "success", message: "保存成功" });
    },
    async fetch() {
      const res = await this.axios.get(`rest/users/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
