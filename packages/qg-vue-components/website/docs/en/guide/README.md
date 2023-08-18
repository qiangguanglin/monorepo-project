---
sidebarDepth: 2
---

This component library is based on element-ui for secondary development. It is for learning purposes only.

:tada: Supports on-demand import。

:100: Compatible IE 12+ 。:fire::fire::fire:

## Install

::: warning
Has not been uploaded to npm, please do not attempt to download.
:::

```bash
npm install qg-component -S
```

```bash
yarn add qg-component -S
```

## Usage

```js
import QgComp from 'qg-component';
import 'qg-component/lib/theme/index.css';

Vue.use(QgComp);
```

### On-demand import

With the help of `babel-plugin-component`, we can import only the required components to reduce the project size.

First, install `babel-plugin-component`:

```bash
npm install babel-plugin-component -D
```

Add in `.babel.config.js`

```js
plugins: [
  [
    'component',
    {
      libraryName: 'test-component',
      styleLibrary: {
        name: 'theme',
        base: false
      }
    }
  ]
];
```

## UMD Usage

Currently, mixed packaging is not implemented, and direct import is not supported. [Please clone the project and build the lib package](https://github.com/qiangguanglin/monorepo-project.git) yourself.

```js
"build:lib": "vue-cli-service build --target lib --dest lib --name test-comp-base packages/index.js"
```