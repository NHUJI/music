import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";
import i18n from "./includes/i18n";
import { registerSW } from "virtual:pwa-register";
import GlobalComponents from "./includes/_globals";
import progressBar from "./includes/progress-bar";

import "./assets/base.css";
import "./assets/main.css";
import "nprogress/nprogress.css"; // 进度条样式

registerSW({ immediate: true }); // 它会在页面加载时立即注册服务工作程序

progressBar(router); // 将路由传递给进度条,让进度条可以访问路由

let app;

// 每当用户状态改变就会发出该事件,把app放里面来监听
auth.onAuthStateChanged(() => {
  // 检查app是否为空,避免每次事件都重新创建vue
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(i18n);
    app.use(GlobalComponents); // 自动注册全局组件
    app.directive("icon", Icon); // 所以的指令名称都有伪装V-前缀的形式,这里的icon就是v-icon

    app.mount("#app");
  }
});
