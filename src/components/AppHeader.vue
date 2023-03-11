<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav
      class="container mx-auto flex justify-start items-center py-5 px-4"
    >
      <!-- App Name -->
      <!-- Vue Router注册的全局组件,会创建一个anchor tag(它将会监听点击事件,会由路由来处理重定向) -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        to="/"
        exact-active-class="no-active"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" to="/about"
              >About
            </router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <!-- 把Manage和Logout放在里面来使用v-else -->
          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage"
                >Manage</router-link
              >
            </li>
            <li>
              <a
                class="px-2 text-white"
                href="#"
                @click.prevent="userStore.signOut"
                >Logout</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
// 将store合并到组件中,就可以访问存储的值了
import { mapStores } from "pinia";
import useModalStore from "@/stores/modal"; // @符号在Vue.js应用中是一个特殊的别名，指代的是应用程序的根目录
import useUserStore from "@/stores/user";

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore), // 用展开运算符调用存储函数
  },
  methods: {
    toggleAuthModal() {
      // modalStore是由mapStores创建的,根据modal.js中定义的id名字创建的
      this.modalStore.isOpen = !this.modalStore.isOpen;
      console.log(this.modalStore.isOpen);
      // console.log(this.userStore.userLoggedIn);
    },
  },
};
</script>
