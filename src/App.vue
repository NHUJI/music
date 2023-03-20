<template>
  <app-header />
  <!-- 用于路由定向的组件显示的位置 -->
  <router-view></router-view>

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
