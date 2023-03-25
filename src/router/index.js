import { createRouter, createWebHistory } from "vue-router";

import useUserStore from "@/stores/user";

// chunk,当路由被访问时才加载组件
const Home = () => import("@/views/Home.vue"); //当路由被访问时才加载组件,import关键字可以作为动态导入模块的函数
const About = () => import("@/views/About.vue");
const Manage = () => import("@/views/manage.vue");
const Song = () => import("@/views/Song.vue");

// 独立出来方便管理(可选)
const routes = [
  {
    name: "home",
    // path表示example.com/之后的部分
    path: "/",
    // 返回对应的组件,呈现页面主要内容的组件一般放在views文件夹
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "manage",
    path: "/manage-music",
    // alias: "/manage",
    component: Manage,
    beforeEach: (to, from, next) => {
      next();
    },
    meta: {
      //可以在这个对象存储任何类型的数据
      requiresAuth: true,
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  // 在浏览器中启用history,比如不刷新页面改变url
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

// 会让你在每个路由请求前加上一个函数来检查,参数依次是要去的位置、当前的位置、next是用于检查的函数
router.beforeEach((to, from, next) => {
  // console.log(to.meta);
  // 不需要权限的页面可以直接访问
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  // 需要权限的页面确定登陆状态
  const store = useUserStore();
  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" }); // 当用户没有登录时重定向到home
  }
});

export default router;
