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
    'typescript',
    [
      'container',
      {
        type: 'code',
        before: (info) => `<code-block lang="${info}">`,
        after: '</code-block>',
      },
    ],
  ],
})