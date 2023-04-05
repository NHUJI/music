import SongItem from "@/components/SongItem.vue";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { expect } from "vitest";
// RouterLinkStub是一个虚拟的路由组件,用于测试

describe("SongItem.vue", () => {
  test("renders song.display_name", () => {
    // 用于测试的dummy值
    const song = {
      display_name: "test",
    };

    // 由于SongItem组件的值是动态的,所以用propsData(已经改为props)传入dummy值来测试
    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          RouterLink: RouterLinkStub, // 通过创建一个假的路由组件来跳过不需要测试的路由组件
        },
      },
    });

    // expect(wrapper.text()).toContain(song.display_name);  // wrapper.text()会返回组件的所有文本

    const compositionAuthor = wrapper.find(".text-gray-500"); // 作者的class包含text-gray-500
    // <span class="text-gray-500 text-sm">{{
    //     song.display_name
    //   }}</span>
    expect(compositionAuthor.text()).toBe(song.display_name); // 精确比较
    // 避免写布尔断言测试,因为布尔断言测试不会给出有用的错误信息
    // 比如类似于expect(compositionAuthor.text() === song.display_nam).toBe(false)
    // 这样的测试,如果测试失败,会返回false,而不是返回具体的错误信息
  });

  test("renders song.docID in id attribute", () => {
    const song = {
      docID: "test",
    };
    // 为了保持测试的独立,所以每次测试都要重新创建一个wrapper(组件的实例)
    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    // 测试id的动态属性,通过attributes()方法来获取根元素的属性
    // expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`);
    // 如果检测class的话,属性会非常多,所以可以通过classes()方法来获取class的数组
    expect(wrapper.classes()).toContain(`song-id-${song.docID}`);
  });
});
