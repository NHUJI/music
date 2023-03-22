import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";

export default createI18n({
  locale: "zh",
  fallbackLocale: "en", // 如果没有找到对应的翻译,则使用fallbackLocale(默认值为en)
  messages: {
    en,
    zh,
  },
  numberFormats: {
    // 这一部分可以独立,但内容不多,所以直接放在这里
    en: {
      currency: {
        style: "currency", // 用于告诉vue-i18n使用货币格式
        currency: "USD", // 用于告诉vue-i18n使用美元作为货币单位
      },
    },
    zh: {
      currency: {
        style: "currency",
        currency: "CNY",
      },
    },
  },
});
