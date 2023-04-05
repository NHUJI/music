/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  overrides: [
    {
      files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
    {
      files: ["**/__tests__/**.spec.js"], // 把规则对应的测试文件中的test设置为全局变量
      global: {
        test: "readonly", // 不允许覆盖test
        describe: "readonly",
        expect: "readonly",
        it: "readonly",
        vi: "readonly",
        BeforeEach: "readonly",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    node: true,
  },
  rules: {
    "vue/multi-word-component-names": "off",
  },
};
