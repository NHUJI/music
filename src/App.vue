<template>
  <app-header />
  <!-- 用于路由定向的组件显示的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <app-player />

  <app-auth />
</template>

<!-- 由于Header不会到处重用,所以在App.vue里register就行了 -->
<script>
import AppHeader from "./components/AppHeader.vue";
import AppAuth from "./components/AppAuth.vue";
import { mapWritableState } from "pinia";
import useUserStore from "@/stores/user"; //useUserStore是根据id创建的
import { auth } from "./includes/firebase";
import AppPlayer from "@/components/Player.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppAuth,
    AppPlayer,
  },
  computed: {
    // 这是为了能够修改user登录状态
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    // 如果用户登录了就设置userLoggedIn为true
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>
<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0s lienar;
  opacity: 0;
}
</style>
