// 记录用户登录状态
import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase"; //usersCollection是我们自己定义的名称,其实是firestore.db.user表
import { updateProfile } from "@firebase/auth";

export default defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      console.log(userCred, userCred.user.uid);

      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      await updateProfile(userCred.user, {
        displayName: values.name,
      });

      this.userLoggedIn = true;
      // 错误的处理在appAuth.vue中
    },
  },
});
