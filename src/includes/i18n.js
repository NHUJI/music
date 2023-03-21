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
});
