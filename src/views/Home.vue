<template>
  <main>
    <!-- Introduction -->
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">
            Listen to Great Music!
          </h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus et dolor mollis, congue augue non, venenatis
            elit. Nunc justo eros, suscipit ac aliquet imperdiet,
            venenatis et sapien. Duis sed magna pulvinar, fringilla
            lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="assets/img/introduction-music.png"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon.right.yellow="'headphones-alt'"
        >
          <span class="card-title">Songs</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <app-song-item
            v-for="song in songs"
            :key="song.docID"
            :song="song"
          />
        </ol>

        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from "@/includes/firebase";
import AppSongItem from "@/components/SongItem.vue";

export default {
  name: "Home",
  components: {
    AppSongItem,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 25,
      pendingRequest: false,
    };
  },
  // 打开页面时获取歌曲数据
  async created() {
    this.getSongs();

    // This code adds a scroll event listener to the window object. The callback function is
    // handleScroll, which is defined below. The scroll event listener is removed in the beforeUnmount
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    // 在页面关闭时移除滚动事件监听器,避免内存泄漏
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Destructure the properties we need from the document and window objects
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;

      const bottomOfWindow =
        Math.round(scrollTop + innerHeight) >= offsetHeight - 100;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },

    async getSongs() {
      // if now fetching songs, stop the function
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;
      let snapshots;

      if (this.songs.length) {
        // get the last song id in the array already fetched
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docID)
          .get();

        snapshots = await songsCollection
          .orderBy("modified_name")
          .startAfter(lastDoc) // start after the last song in the array
          .limit(this.maxPerPage)
          .get();
      } else {
        // if there are no songs in the array, fetch the first batch
        snapshots = await songsCollection
          .orderBy("modified_name")
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(), // 展开运算符把值放入对象
        });
      });

      this.pendingRequest = false;
    },
  },
};
</script>
