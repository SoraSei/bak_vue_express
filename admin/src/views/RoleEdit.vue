<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}角色</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name" />
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title" />
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="i in categories"
                :key="i._id"
                :label="i.name"
                :value="i._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="属性1">
            <el-rate
              style="margin-top:10px"
              :max="10"
              show-score
              v-model="model.scores.attr1"
            />
          </el-form-item>
          <el-form-item label="属性2">
            <el-rate
              style="margin-top:10px"
              :max="10"
              show-score
              v-model="model.scores.attr2"
            />
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'img', res.url)"
            >
              <img v-if="model.img" :src="model.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="背景">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'bg', res.url)"
            >
              <img v-if="model.bg" :src="model.bg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="装备1">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="i in items"
                :key="i._id"
                :label="i.name"
                :value="i._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="装备2">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="i in items"
                :key="i._id"
                :label="i.name"
                :value="i._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="model.description" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button style="margin-bottom:15px" @click="model.skills.push({})"
            ><i class="el-icon-plus" />添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(skill, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="skill.name" />
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(skill, 'img', res.url)"
                >
                  <img v-if="skill.img" :src="skill.img" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="skill.description" type="textarea" />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  size="small"
                  @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" style="margin-top:15px" native-type="submit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: { id: {} },
  data() {
    return {
      model: { categories: [], scores: {}, skills: [] },
      categories: [],
      items: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.axios.put(`rest/roles/${this.id}`, this.model);
      } else {
        await this.axios.post("rest/roles", this.model);
      }
      this.$router.push("/roles/list");
      this.$message({ type: "success", message: "保存成功" });
    },
    async fetch() {
      const res = await this.axios.get(`rest/roles/${this.id}`);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.axios.get("rest/categories");
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.axios.get("rest/items");
      this.items = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.fetchItems();
    this.id && this.fetch();
  }
};
</script>
