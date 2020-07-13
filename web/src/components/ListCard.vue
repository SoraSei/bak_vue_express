<template>
  <c-card :icon="icon" :title="title">
    <div class="nav">
      <div
        class="nav-item"
        :class="{ act: act === i }"
        v-for="(cat, i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{ cat.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper
        ref="list"
        :options="{ autoHeight: true }"
        @slide-change="() => (act = $refs.list.swiper.realIndex)"
      >
        <swiper-slide v-for="(cat, i) in categories" :key="i">
          <slot name="items" :category="cat" />
        </swiper-slide>
      </swiper>
    </div>
  </c-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      act: 0
    };
  }
};
</script>
