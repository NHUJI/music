// 使用as防止冲突
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
//导入需要的规则并在上方添加defineRule以运行我们全局注册规则
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  max_value as MaxVal,
  min_value as MinVal,
  numeric,
  confirmed,
  not_one_of as excluded,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    // 第一个是自己的命名,第二个是执行验证的函数(也就是我们上面import的那个,不用自己定义函数)
    defineRule("required", required);
    defineRule("tos", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);
    defineRule("max_value", MaxVal);
    defineRule("min_value", MinVal);
    defineRule("numeric", numeric);
    defineRule("passwords_mismatch", confirmed);
    defineRule("excluded", excluded);
    defineRule("country_excluded", excluded);
    defineRule("required", required);

    configure({
      // 当全局验证器函数返回false,这个函数就调用并接受context(正在验证的字段信息)
      generateMessage: (ctx) => {
        // 属性名必须对应规则名
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
          country_excluded:
            "Due to restrictions, we do not accept users from this location.",
          passwords_mismatch: "The passwords don't match.",
          tos: "You must accept the Terms of Service.",
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
      validateOnModelUpdate: true,
    });
  },
};
