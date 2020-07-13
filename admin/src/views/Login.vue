<template>
  <el-card header="请先登录" class="login-card">
    <el-form @submit.native.prevent="login">
      <el-form-item label="用户名">
        <el-input v-model="model.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return { model: {} };
  },
  methods: {
    async login() {
      const res = await this.axios.post("login", this.model);
      // sessionStorage.token = res.data.token;
      localStorage.token = res.data.token; // 浏览器 localStorage.token查看 localStorage.clear()清除
      this.$router.push("/");
      this.$message({ type: "success", message: "登录成功" });
    }
  }
};
</script>
