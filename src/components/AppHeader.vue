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
          <li>
            <a
              class="px-2 text-white"
              href="#"
              @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
// 将store合并到组件中,就可以访问存储的值了
import { mapStores } from 'pinia'
import useModalStore from '@/stores/modal' // @符号在Vue.js应用中是一个特殊的别名，指代的是应用程序的根目录
export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore) // 用展开运算符调用存储函数
  },
  methods: {
    toggleAuthModal() {
      // modalStore是由mapStores创建的,根据modal.js中定义的id名字创建的
      this.modalStore.isOpen = !this.modalStore.isOpen
      console.log(this.modalStore.isOpen)
    }
  }
}
</script>
