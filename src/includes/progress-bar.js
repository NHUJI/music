import NProgress from "nprogress";

export default (router) => {
  // 页面加载之前,启动进度条
  router.beforeEach((to, from, next) => {
    NProgress.start(); // 启动进度条(一点点增加)
    next(); // 调用next让路由开始加载组件
  });

  // 页面加载之后,填满并关闭进度条
  //   router.afterEach(() => {
  //     NProgress.done();
  //   });
  router.afterEach(NProgress.done);
};
