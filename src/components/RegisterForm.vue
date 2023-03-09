<template>
  <!-- Registration Form -->
  <!-- 带有间距的警告框 根据本地data显示决定是否显示、背景颜色、-->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <!-- validation-schema允许我们把规则外报道一个对象中,这个值必须是组件数据的一个对象 -->
  <!-- veevalidate的submit会验证全部规则并且避免提交时自动刷新 -->
  <vee-form
    :validation-schema="schema"
    @submit="register"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" as="p" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" as="p" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" as="p" />
    </div>
    <!-- Password -->
    <!-- bails设置为false停止使用快速退出策略 -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        :bails="false"
        v-slot="{ field, errors }"
      >
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <!-- 为了输出多个错误使用使用了div -->
        <div
          class="text-red-600"
          v-for="error in errors"
          :key="error"
        >
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage
        class="text-red-600"
        name="confirm_password"
        as="p"
      />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Moon">Moon</option>
        <option value="Mars">Mars</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" as="p" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <!-- 设置value="1"是为了确保有值(复选框被选中时要发送的数据),而不造成错误 -->
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600" name="tos" as="p" />
    </div>
    <button
      type="submit"
      class="block w-full text-white py-1.5 px-3 rounded transition"
      :disabled="reg_in_submission"
      :class="reg_button"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";

export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        // 只允许输入空格和字符
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:18|max_value:100",
        password: "required|min:9|max:100|excluded:password",
        confirm_password: "passwords_mismatch:@password",
        country: "required|country_excluded:Moon,Mars",
        tos: "tos",
      },
      // 给表单增加默认值,必须和field里的name相同
      userData: {
        country: "USA",
      },
      reg_in_submission: false, // 用于如果提交正在进行,禁用表单
      reg_show_alert: false, // 警告框,默认隐藏
      reg_alert_variant: "bg-blue-500", // 不同颜色的警告框
      reg_alert_msg: "Please wait! Your account is being created.",
      reg_button: "bg-purple-600 hover:bg-purple-700", // 提交前显示蓝色
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg =
        "Please wait! Your account is being created.";

      // 注册用户信息
      try {
        await this.createUser(values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg =
          "An unexpected error occured. Please try again later.";
        console.log(error);
        return;
      }

      this.reg_alert_variant = "bg-green-500";
      this.reg_alert_msg = "Success! Your accoutn has been created";

      this.reg_button = "bg-gray-800"; // 提交后显示灰色
    },
  },
};
</script>
