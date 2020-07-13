<template>
  <div>
    <div class="d-flex p-3 border-bottom">
      <strong class="flex-1">{{ model.title }}</strong>
      <div class="text-grey fs-xs">{{ model.createdAt | date }}</div>
    </div>
    <div v-html="model.body" class="px-3 article-body fs-lg"></div>
    <div class="p-3 border-top">
      <div class="fs-lg mb-2">相关资讯</div>
      <router-link
        class="py-1"
        tag="div"
        :to="`/articles/${i._id}`"
        v-for="i in model.related"
        :key="i._id"
        >{{ i.title }}</router-link
      >
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: { id: { required: true } },
  data() {
    return { model: {} };
  },
  filters: {
    date(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  methods: {
    async fetch() {
      const res = await this.axios.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
.article-body {
  img {
    max-width: 100%;
    height: auto;
  }
  iframe {
    width: 100%;
    height: auto;
  }
}
</style>
