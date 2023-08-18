import { defineConfig } from "vuepress/config";
import locales from '../config/language';
import themeConfig from '../config/themeConfig';

export default defineConfig({
  title: 'qg-component',
  description: 'qg-component 组件库文档',
  markdown: {
    lineNumbers: true,
  },
  base: '/vue-comp/',
  locales,
  themeConfig,
  plugins: [
    '@vuepress/plugin-back-to-top',
    // 'typescript',
    [
      'vuepress-plugin-typescript',
      {
        tsLoaderOptions: {
          // 设置为 true，以在遇到 TypeScript 错误时不中断构建
          transpileOnly: true,
          // 其他 ts-loader 选项
        },
      },
    ],
  ],
  configureWebpack: {
    node: {
      global: true,
    },
  }
})