import About from "@/views/About.vue";
import { shallowMount } from "@vue/test-utils"; // CLI安装的,作用是组件->构造函数->创建实例->挂载实例到DOM上
// shallowMount和mount的区别是shallowMount会限制为一级子组件,而mount会递归挂载所有子组件,可以帮助隔离组件
// 不过Mount也可以使用Mount(About, shallow: true)来限制为一级子组件

// describe允许我们把多个测试用例组织在一起，称之为测试套件（test suite）
// 第一个参数是测试套件的名称，第二个参数是测试套件的函数
describe("About.vue", () => {
  test("renders inner text", () => {
    // 1. Arrange 由于vitest独立于Vue，所以我们需要手动mount组件(没有初始化app,因为这是一个单元测试)
    const wrapper = shallowMount(About, {
      global: {
        mocks: {
          // 用于测试的mock数据,在其中定义的函数会被当成全局函数而不是组件的方法
          $t: (message) => message,
        },
      },
    }); // warpper包含用于和组件交互的方法和属性
    // 2. Act
    const text = wrapper.text(); // text()返回组件的文本内容
    // 3. Assert
    expect(text).toContain("about"); // toContain()方法用于检查字符串是否包含指定的子字符串
  });
});
