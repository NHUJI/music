// 使用npm run test:unit命令启动测试

// spec用于表示这是测试文件
// 这将作为sanity test(健全性)，用于检查测试环境是否正常,它始终会通过测试

// import { test } from "vitest";

// 第一个参数是测试的名称，第二个参数是测试的函数
test("sanity test", () => {
  // 断言(Assertion)是一个表达式,它的值是true或false
  expect(true).toBe(true); // expect会接受一个值,然后返回一个对象,然后调用这个对象的方法来进行断言
});
