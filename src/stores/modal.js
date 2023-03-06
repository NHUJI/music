// 导入存储函数
import { defineStore } from 'pinia'

export default defineStore('modal', {
  state: () => ({
    isOpen: false
  }),
  getters: {
    // 用于在vue模版中选择是否显示某个tailwind元素,避免自己在div中写逻辑判断
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : ';'
    }
  }
})
