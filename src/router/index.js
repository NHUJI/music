import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Manage from "@/views/manage.vue";
// 独立出来方便管理(可选)
const routes = [
  {
    // path表示example.com/之后的部分
    path: "/",
    // 返回对应的组件,呈现页面主要内容的组件一般放在views文件夹
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/manage",
    component: Manage,
  },
];

const router = createRouter({
  // 在浏览器中启用history,比如不刷新页面改变url
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

export default router;
