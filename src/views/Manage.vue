<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <!-- 传入addSong,在上传成功后更新列表 -->
        <div class="col-span-1">
          <app-upload ref="upload" :addSong="addSong" />
        </div>
        <div class="col-span-2">
          <div
            class="bg-white rounded border border-gray-200 relative flex flex-col"
          >
            <div
              class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
            >
              <span class="card-title">My Songs</span>
              <i
                class="fa fa-compact-disc float-right text-green-400 text-2xl"
              ></i>
            </div>
            <div class="p-6">
              <!-- Composition Items, 通过本地歌曲列表遍历,并传入各种数据和函数 -->
              <composition-item
                v-for="(song, i) in songs"
                :key="song.docID"
                :song="song"
                :updateSong="updateSong"
                :index="i"
                :removeSong="removeSong"
                :updateUnsavedFlag="updateUnsavedFlag"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// import useUserStore from "@/stores/user";
import AppUpload from "@/components/Upload.vue";
import { songsCollection, auth } from "@/includes/firebase";
import CompositionItem from "@/components/CompositionItem.vue";

export default {
  name: "Manage",
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return {
      songs: [], // 歌曲列表
      unsavedFlag: false, // 跳转提示默认关闭
    };
  },
  async created() {
    // 获得快照得到歌曲数据然后加入本地列表(之所以使用快照 也就是比ref多了个.get(),是因为ref没有data)
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();

    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id, //data里没有数据的id,所以手动加入
      };

      this.songs.push(song); // 放入本地列表
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  // 再离开页面时检查是否有正在编辑的表格
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      next(leave); //根据用户选择来决定是否离开页面
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore();

  //   if (store.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: "home" });
  //   }
  // },
};
</script>
