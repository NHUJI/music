import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";
import i18n from "./includes/i18n";

import "./assets/base.css";
import "./assets/main.css";

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
    app.directive("icon", Icon); // 所以的指令名称都有伪装V-前缀的形式,这里的icon就是v-icon

    app.mount("#app");
  }
});
