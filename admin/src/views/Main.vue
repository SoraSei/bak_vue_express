<template>
  <el-container style="height:100vh">
    <el-aside width="200px" style="background-color:rgb(238,241,246)">
      <!--<el-menu router :default-openeds="['1']">-->
      <el-menu router :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu" />内容管理</template>
          <el-menu-item-group title="物品">
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="角色">
            <el-menu-item index="/roles/create">新建角色</el-menu-item>
            <el-menu-item index="/roles/list">角色列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="文章">
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu" />运营管理</template>
          <el-menu-item-group title="广告位">
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu" />系统管理</template>
          <el-menu-item-group title="分类">
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="用户">
            <el-menu-item index="/users/create">新建用户</el-menu-item>
            <el-menu-item index="/users/list">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align:right">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right:15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ model.username }}</span>
      </el-header>

      <el-main>
        <router-view :key="$route.path" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return { model: {} };
  },
  methods: {
    async fetch() {
      const res = await this.axios.get("user");
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>
