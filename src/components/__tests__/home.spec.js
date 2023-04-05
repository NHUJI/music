import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import SongItem from "@/components/SongItem.vue";

vi.mock("@/includes/firebase", () => ({})); // mock firebase,因为我们不需要测试firebase

describe("Home.vue", () => {
  test("renders list of song", () => {
    // 检查组件是否能够渲染正确数量的歌曲
    // 但我们不会使用原本的created()方法来获取歌曲列表,因为http请求有不确定性,所以使用mock数据
    const songs = [{}, {}, {}]; // 传入3个歌曲,我们不关心歌曲的具体内容,只关心歌曲的数量

    const component = shallowMount(Home, {
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          // 用于测试的mock数据,在其中定义的函数会被当成全局函数而不是组件的方法
          $t: (message) => message,
        },
      },
    });

    const items = component.findAllComponents(SongItem); // 返回被调用的组件中组件数组,也就是说它主要用来寻找组件

    expect(items).toHaveLength(songs.length); // 检查组件的数量是否和歌曲的数量相同

    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i]); // 检查组件的props是否和歌曲的内容相同
    });
  });
});
