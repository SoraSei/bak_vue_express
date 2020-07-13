<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide
        ><img class="w-100" src="../assets/images/swiper1.jpeg"
      /></swiper-slide>
      <swiper-slide
        ><img class="w-100" src="../assets/images/swiper2.jpeg"
      /></swiper-slide>
      <div
        class="swiper-pagination text-right px-3 pb-1"
        slot="pagination"
      ></div>
    </swiper>

    <div
      class="bg-white mt-3 pt-3 text-center text-black border-top border-bottom"
    >
      <div class="d-flex flex-wrap">
        <div class="nav-icon-item mb-3 border-right" v-for="n in 6" :key="n">
          <i class="sprite sprite-01" />
          <div class="py-2">标题</div>
        </div>
      </div>
      <div class="bg-light-1 py-2 fs-sm">收起</div>
    </div>

    <c-list-card icon="03" title="标题1" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{
            news.title
          }}</span>
          <span class="text-grey fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </c-list-card>

    <c-list-card icon="03" title="标题2" :categories="roleCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap">
          <router-link
            tag="div"
            :to="`/roles/${role._id}`"
            class="p-2 text-center"
            style="width:20%"
            v-for="(role, i) in category.roleList"
            :key="i"
          >
            <img :src="role.img" class="w-100" />
            <div>{{ role.name }}</div>
          </router-link>
        </div>
      </template>
    </c-list-card>

    <c-card icon="03" title="标题3"></c-card>
    <c-card icon="03" title="标题4"></c-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      swiperOption: { pagination: { el: ".swiper-pagination" } },
      newsCats: [],
      roleCats: []
      // newsCatsTemp: [
      //   {
      //     name: "hot",
      //     newsList: new Array(5)
      //       .fill({})
      //       .map(() => ({ categoryName: "type", title: "", date: "06/01" }))
      //   }
      // ]
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.axios.get("news/list");
      this.newsCats = res.data;
    },
    async fetchRoleCats() {
      const res = await this.axios.get("roles/list");
      this.roleCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchRoleCats();
  }
};
</script>

<style lang="scss">
@import "../assets/_variables";

.swiper-pagination {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.2rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icon-item {
  width: 25%;
  &:nth-child(4n) {
    border-right: none;
  }
}
</style>
