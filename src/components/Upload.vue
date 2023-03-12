<template>
  <div class="col-span-1">
    <div
      class="bg-white rounded border border-gray-200 relative flex flex-col"
    >
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i
          class="fas fa-upload float-right text-green-400 text-2xl"
        ></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
          :class="{
            'bg-green-400 border-green-400 border-solid': is_dragover,
          }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="is_dragover = false"
          @dragover.prevent.stop="is_dragover = true"
          @dragenter.prevent.stop="is_dragover = true"
          @dragleave.prevent.stop="is_dragover = false"
          @drop.prevent.stop="upload($event)"
        >
          <h5>Drop your files here</h5>
        </div>
        <hr class="my-6" />
        <!-- Progess Bars -->
        <div class="mb-4">
          <!-- File Name -->
          <div class="font-bold text-sm">Just another song.mp3</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar bg-blue-400"
              style="width: 75%"
            ></div>
          </div>
        </div>
        <div class="mb-4">
          <div class="font-bold text-sm">Just another song.mp3</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <div
              class="transition-all progress-bar bg-blue-400"
              style="width: 35%"
            ></div>
          </div>
        </div>
        <div class="mb-4">
          <div class="font-bold text-sm">Just another song.mp3</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <div
              class="transition-all progress-bar bg-blue-400"
              style="width: 55%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { storage } from "@/includes/firebase";
export default {
  name: "Upload",
  data() {
    return {
      //  拖动文件到方框时的hover效果开启
      is_dragover: false,
    };
  },
  methods: {
    upload($event) {
      // 元素drop后关掉js添加的hover效果
      this.is_dragover = false;
      // 文件对象,不过需要把文件对象转换成数组
      //   const { files } = $event.dataTransfer;
      const files = [...$event.dataTransfer.files];
      // 遍历上传的文件来传入firebase
      files.forEach((file) => {
        // 检查文件类型(客户端)
        if (file.type !== "audio/mpeg") {
          return; //如果检查没问题就继续后面的代码
        }
        // 创建引用,并把歌曲存在songs文件夹下
        const storageRef = storage.ref(); // xxx.xxx.com
        const songsRef = storageRef.child(`songs/${file.name}`); // xxx.xxx.com/songs/xxxxx.mp3
        songsRef.put(file);
      });
    },
  },
};
</script>
