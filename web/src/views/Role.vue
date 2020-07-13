<template>
  <div>
    <div class="topbar bg-black p-3 d-flex ai-center">
      <img src="../assets/images/avatar1.jpg" height="20px" />
      <div class="px-2 text-white fs-lg flex-1">标题</div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>

    <div class="role-top" :style="{ 'background-image': `url(${model.bg})` }">
      <div class="mask text-white p-3 h-100 d-flex flex-col jc-end">
        <div>{{ model.title }}</div>
        <h2 class="my-3">{{ model.name }}</h2>
        <div>{{ model.categories.map(v => v.name).join(" / ") }}</div>
        <div class="d-flex jc-between pt-3">
          <div>
            属性1：{{ model.scores.attr1 }} / 属性2：{{ model.scores.attr2 }}
          </div>
          <router-link to="/" tag="div">皮肤 &gt;</router-link>
        </div>
      </div>
    </div>

    <div class="nav py-3 border-bottom">
      <div class="nav-item act"><div class="nav-link">页面1</div></div>
      <div class="nav-item"><div class="nav-link">页面2</div></div>
    </div>

    <swiper>
      <swiper-slide>
        <div class="p-3 border-bottom">
          <div class="d-flex">
            <router-link tag="button" to="/" class="btn btn-lg flex-1">
              <i class="sprite sprite-02" />介绍视频
            </router-link>
            <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
              <i class="sprite sprite-02" />介绍视频
            </router-link>
          </div>

          <div class="role-skills mt-4">
            <div class="d-flex jc-around">
              <img
                class="icon"
                @click="currentSkillIndex = i"
                :class="{ act: currentSkillIndex === i }"
                :src="skill.img"
                v-for="(skill, i) in model.skills"
                :key="i"
              />
            </div>
            <div class="py-2" v-if="currentSkill">
              <h2>{{ currentSkill.name }}</h2>
              <div>{{ currentSkill.description }}</div>
            </div>
          </div>
        </div>

        <c-card plain icon="03" title="装备列表" class="role-items">
          <div class="fs-xl">装备1</div>
          <div class="d-flex text-center mt-3">
            <div v-for="i in model.items1" :key="i.name">
              <img :src="i.img" class="icon" />
              <div>{{ i.name }}</div>
            </div>
          </div>
          <div class="border-bottom my-3"></div>
          <div class="fs-xl">装备2</div>
          <div class="d-flex text-center mt-3">
            <div v-for="i in model.items2" :key="i.name">
              <img :src="i.img" class="icon" />
              <div>{{ i.name }}</div>
            </div>
          </div>
        </c-card>
        <c-card plain icon="03" title="描述">{{ model.description }}</c-card>
      </swiper-slide>
      <swiper-slide></swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props: { id: { required: true } },
  data() {
    return {
      model: { categories: [], scores: {}, skills: [] },
      currentSkillIndex: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.axios.get(`roles/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/_variables";

.role-top {
  height: 50vw;
  background: #111 no-repeat top center;
  background-size: auto 100%;
  .mask {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
}
.role-skills img.icon {
  width: 70px;
  height: 70px;
  border: 3px solid map-get($colors, "white");
  &.act {
    border-color: map-get($colors, "primary");
  }
  border-radius: 50%;
}
.role-items {
  .d-flex > div {
    width: 20%;
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>
