import { setActivePinia, createPinia } from "pinia";
// 不会导入任何组件,因为我们只是测试store
import useUserStore from "@/stores/user";

// mock的第一个参数是要mock的模块(会覆盖原本的import),第二个参数是mock返回的值
vi.mock("@/includes/firebase", () => ({
  auth: {
    signInWithEmailAndPassword: () => Promise.resolve(), // 使用resolve表示成功返回
  },
}));

describe("stores", () => {
  beforeEach(() => {
    // 由于pinia运行需要组件,所以使用setActivePinia欺骗pinia
    setActivePinia(createPinia()); // 为了避免测试之间的干扰,每次测试都要重新创建一个pinia实例
  });

  test("authenticates user", async () => {
    const store = useUserStore();

    expect(store.userLoggedIn).toBe(false); // 测试默认情况下userLoggedIn的值为false

    await store.authenticate({}); // 登录
    expect(store.userLoggedIn).toBe(true); // 登录后应该为true
  });
});
