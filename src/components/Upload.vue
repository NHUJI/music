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
        <input type="file" multiple @change="upload($event)" />
        <hr class="my-6" />

        <!-- Progess Bars -->
        <div
          class="mb-4"
          v-for="upload in uploads"
          :key="upload.name"
        >
          <!-- File Name -->
          <div class="font-bold text-sm" :class="upload.text_class">
            <i :class="upload.icon"></i> {{ upload.name }}
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar"
              :class="upload.variant"
              :style="{
                width: upload.current_progress + '%',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { storage, auth, songsCollection } from "@/includes/firebase";

export default {
  name: "Upload",
  data() {
    return {
      //  拖动文件到方框时的hover效果开启
      is_dragover: false,
      // 将上传的内容存入这个数组以方便展示
      uploads: [],
    };
  },
  methods: {
    upload($event) {
      // 元素drop后关掉js添加的hover效果
      this.is_dragover = false;
      // 文件对象,不过需要把文件对象转换成数组
      //   const { files } = $event.dataTransfer;
      // 选择文件上传的存储位置不一样
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];

      // 遍历上传的文件来传入firebase
      files.forEach((file) => {
        // 检查文件类型(客户端)
        if (file.type !== "audio/mpeg") {
          return; //如果检查没问题就继续后面的代码
        }
        // 创建引用,并把歌曲存在songs文件夹下
        const storageRef = storage.ref(); // xxx.xxx.com
        const songsRef = storageRef.child(`songs/${file.name}`); // xxx.xxx.com/songs/xxxxx.mp3
        // 监听put返回对象的事件
        const task = songsRef.put(file);

        // push存入上传的文件数据用于展示进度条,然后返回数组长度,减1获得Index大小
        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: "bg-blue-400", // 增加默认颜色,方便修改
            icon: "fas fa-spinner fa-spin", // 增加font awesome图标
            text_class: "", // 文件名颜色
          }) - 1;

        // 返回上传成功、失败还有进度 snapshot代表当前的状态
        task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            // 处理失败情况
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].text_class = "text-red-400";
            console.log(error);
          },
          async () => {
            // 成功后改变进度条样式和存储上传文件的用户信息,存储两个名字是为了避免用户修改歌曲名称时我们需要修改数据库和重命名文件
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: "",
              comment_count: 0,
            };
            song.url = await task.snapshot.ref.getDownloadURL();
            await songsCollection.add(song); // add和set不同在于,add会自动生成ID

            this.uploads[uploadIndex].variant = "bg-green-400";
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_class = "text-green-400";
          }
        );
      });
    },
    // cancelUploads() {
    //   this.uploads.forEach((upload) => {
    //     upload.task.cancel();
    //   });
    // },
    // 用户离开组件时取消上传
    beforeUnmount() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },
};
</script>
