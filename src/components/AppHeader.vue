<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav
      class="container mx-auto flex justify-start items-center py-5 px-4"
    >
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#"
        >Music</a
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
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
              <a class="px-2 text-white" href="#">Manage</a>
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
