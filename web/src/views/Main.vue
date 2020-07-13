<template>
  <div class="bg-light-2">
    <div class="topbar bg-black p-3 d-flex ai-center jc-center">
      <img src="../assets/images/avatar1.jpg" height="20px" />
      <div class="px-2 text-white fs-lg">标题</div>
    </div>
    <div class="nav nav-inverse bg-primary py-3">
      <div class="nav-item act">
        <router-link class="nav-link" tag="div" to="/">首页</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" tag="div" to="/">页面1</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" tag="div" to="/">页面2</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
