// 用于自动全局注册组件
import _ from "lodash"; // 可以提供一些有用的工具函数

export default {
  install(app) {
    // 搜索全局组件目录,所有在base目录下的.vue文件都会注册为全局组件
    const baseComponents = import.meta.glob(
      "../components/base/*.vue",
      {
        eager: true, // 立即导入(默认情况下它是lazy的)
      }
    );
    // 将glob导入的对象转换为数组
    Object.entries(baseComponents).forEach(([path, module]) => {
      //  获取文件名,将文件名转换为有效的组件名称循环遍历它们
      const componentsName = _.upperFirst(
        _.camelCase(
          path
            .split("/") // 将路径分割为数组
            .pop() // 获取文件名(目录的最后一个元素)
            .replace(/\.\w+$/, "") // 去除文件扩展名
        )
      );
      //  console.log(path, componentsName);
      //  export default,加上Base防止和其他组件重名
      app.component(`Base${componentsName}`, module.default);
    });
  },
};
