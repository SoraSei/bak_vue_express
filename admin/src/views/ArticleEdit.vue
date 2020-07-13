<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="i in categories"
            :key="i._id"
            :label="i.name"
            :value="i._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title" />
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: { id: {} },
  components: { VueEditor },
  data() {
    return { model: {}, categories: [] };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("file", file);
      const res = await this.axios.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      if (this.id) {
        await this.axios.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.axios.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({ type: "success", message: "保存成功" });
    },
    async fetch() {
      const res = await this.axios.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.axios.get("rest/categories");
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>
