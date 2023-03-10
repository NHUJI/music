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
    async authenticate(values) {
      // 老打错字...这里有因为函数名出错了
      await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      );

      // 不用使用try catch因为如果上面一步出错会抛出错误
      this.userLoggedIn = true;
    },
    async signOut() {
      // firebase提供的简单方法,会把本地和服务器的注销都实现
      await auth.signOut();
      this.userLoggedIn = false;
    },
  },
});
