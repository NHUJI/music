<template>
  <main>
    <!-- Music Header -->
    <section
      class="w-full mb-8 py-14 text-center text-white relative"
    >
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="newSong(song)"
          type="button"
          class="z-10 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-10 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">
            {{ song.modified_name }}
          </div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        >
          <!-- Comment Count -->
          <span class="card-title"
            >Comments ({{ song.comment_count }})</span
          >
          <i
            class="fa fa-comments float-right text-green-400 text-2xl"
          ></i>
        </div>
        <div
          class="text-white text-center font-bold p-4 rounded mb-4"
          v-if="comment_show_alert"
          :class="comment_alert_variant"
        >
          {{ comment_alert_msg }}
        </div>
        <div class="p-6">
          <vee-form
            :validation-schema="commentSchema"
            @submit="addComment"
            v-if="userLoggedIn"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />

            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>

          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>{{ comment.comment }}</p>
      </li>
    </ul>
  </main>
</template>

<script>
import {
  songsCollection,
  auth,
  commentsCollection,
} from "@/includes/firebase";
import { mapState, mapActions } from "pinia";
import useUserStore from "@/stores/user";
import usePlayerStore from "@/stores/player";

export default {
  name: "Song",
  data() {
    return {
      song: {},
      commentSchema: {
        comment: "required|min:3|max:255",
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "bg-blue-500",
      comment_alert_msg:
        "Please wait! Your comment is being submitted... ",
      comments: [],
      sort: "1", // 1: latest, 2: oldest
    };
  },
  computed: {
    ...mapState(useUserStore, ["userLoggedIn"]),
    sortedComments() {
      // 不能直接用 this.comments.sort()，计算属性可以使用数据属性,但不应该直接修改,所以要用 slice() 复制一份
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "1") {
          // use Date(b.datePosted) make String to Object
          return new Date(b.datePosted) - new Date(a.datePosted);
        } else {
          return new Date(a.datePosted) - new Date(b.datePosted);
        }
      });
    },
  },
  async created() {
    // not use where because only want to get one document, if we want to get multiple documents, we use where
    const docSnapshot = await songsCollection
      .doc(this.$route.params.id)
      .get();

    if (!docSnapshot.exists) {
      this.$router.push({ name: "home" });
      return;
    }

    // grab sort from query
    const { sort } = this.$route.query;
    // if sort is 1 or 2, then set it to this.sort, otherwise set it to 1
    this.sort = sort === "1" || sort === "2" ? sort : "1";

    this.song = docSnapshot.data();
    this.getComments();
  },
  methods: {
    ...mapActions(usePlayerStore, ["newSong"]),
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "bg-blue-500";
      this.comment_alert_msg =
        "Please wait! Your comment is being submitted... ";

      const comment = {
        comment: values.comment,
        datePosted: new Date().toString(), // add timestamp
        sid: this.$route.params.id, // add song id
        name: auth.currentUser.displayName, // add user name
        uid: auth.currentUser.uid, // add user id, because can't change
      };

      await commentsCollection.add(comment); // add comment to firestore

      this.song.comment_count += 1; // increment comment count
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count,
      }); // update comment count in firestore

      this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = "bg-green-500";
      this.comment_alert_msg =
        "Your comment has been submitted successfully!";
      resetForm(); // clear form
    },
    async getComments() {
      const querySnapshot = await commentsCollection
        .where("sid", "==", this.$route.params.id)
        .get();

      this.comment = []; // clear comment array

      querySnapshot.forEach((doc) => {
        // add comment to array
        this.comments.push({
          docID: doc.id, // id not in the document, so we need to add it
          ...doc.data(),
        });
      });
    },
  },
  // watch is used to watch the change of the data
  watch: {
    // when sort change, we will push the new sort value to the query
    sort(newVal) {
      // make sure only push when the sort value is different
      if (this.$route.query.sort === newVal) {
        return;
      }
      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>
