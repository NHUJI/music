<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <!-- Login Form -->
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t("auth.Email") }}</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.RegisterForm.Enter_Email')"
      />
      <ErrorMessage class="text-red-600" name="email" as="p" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{
        $t("auth.Password")
      }}</label>
      <vee-field
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.RegisterForm.Enter_Password')"
      />
      <ErrorMessage class="text-red-600" name="password" as="p" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="login_in_submission"
    >
      {{ $t("auth.Submit") }}
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";

export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:9|max:100",
      },
      login_in_submission: false, // 用于如果提交正在进行,禁用表单
      login_show_alert: false, // 警告框,默认隐藏
      login_alert_variant: "bg-blue-500", // 不同颜色的警告框
      login_alert_msg: "Please wait! We are logging you in.",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = "bg-blue-500";
      this.login_alert_msg = "Please wait! We are logging you in.";
      try {
        await this.authenticate(values);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = "bg-red-500";
        this.login_alert_msg = "Invalid login details.";
        console.log(error);
        return; // 防止函数继续执行
      }
      this.login_alert_variant = "bg-green-500";
      this.login_alert_msg = "Success! You are now logged in.";
      window.location.reload();
    },
  },
};
</script>
