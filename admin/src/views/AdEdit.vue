<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.ads.push({})"
          ><i class="el-icon-plus" />添加广告</el-button
        >
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="12" v-for="(ad, i) in model.ads" :key="i">
            <el-form-item label="链接">
              <el-input v-model="ad.url" />
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(ad, 'img', res.url)"
              >
                <img v-if="ad.img" :src="ad.img" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                size="small"
                @click="model.ads.splice(i, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
    return { model: { ads: [] } };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.axios.put(`rest/ads/${this.id}`, this.model);
      } else {
        await this.axios.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({ type: "success", message: "保存成功" });
    },
    async fetch() {
      const res = await this.axios.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
