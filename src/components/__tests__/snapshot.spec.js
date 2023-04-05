import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import SongItem from "@/components/SongItem.vue";
import { expect, test } from "vitest";

describe("Snapshots SongItem.vue", () => {
  test("renders correctly", () => {
    const song = {
      docID: "abc",
      modified_name: "test",
      display_name: "test",
      comment_count: 5,
    };

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: {
          "router-link": RouterLinkStub,
        },
      },
    });

    // 生成快照(没有时生成，有时和之前生成的比较)
    expect(wrapper.element).toMatchSnapshot();
  });
});
