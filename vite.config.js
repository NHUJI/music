import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
// import { visualizer } from "rollup-plugin-visualizer"; // 可视化打包后的文件大小,需要时再引入

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true, // 可以在测试文件中直接使用全局变量而无需导入或声明它们
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate", // PWA可以离线运行,所以需要缓存应用文件
      devOptions: {
        enabled: true, // 默认情况下清单和服务工作程序仅在生产中生成。如果您想在开发中测试它们，可以将此选项设置为true。
      },
      manifest: {
        name: "Music App",
        theme_color: "#ff5e3a",
        icons: [
          {
            src: "/assets/img/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,gif,svg,woff2}"], // glob的意思是全局匹配,这里是匹配所有静态资源,woff2是字体
      },
    }),
    // visualizer({ open: true }), // 打包分析,在npm run build后会自动打开分析页面
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
