// https://docs.cypress.io/api/introduction/api.html
// 使用npm run test:e2e运行测试

describe("Sanity Test", () => {
  it("visits the app root url", () => {
    cy.visit("/"); // 访问网页主页
    cy.contains("#header a:first-child", "Music"); // 检查是否有Logo
  });
});
