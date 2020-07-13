<template>
  <div class="bg-white p-3 mt-3 border-bottom">
    <div
      class="d-flex ai-center"
      :class="{ 'border-bottom': !plain, 'pb-3': !plain }"
    >
      <i class="sprite" :class="`sprite-${icon}`" />
      <div class="fs-xl flex-1 px-2">{{ title }}</div>
      <i class="sprite sprite-news" v-if="!plain" />
    </div>
    <div class="pt-3"><slot /></div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean }
  }
};
</script>
