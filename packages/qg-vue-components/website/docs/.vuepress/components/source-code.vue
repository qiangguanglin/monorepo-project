<template>
    <div class="content-wrapper">
      <div class="codeWrapper" ref="codeWrapper" :style="`--before-content: '${lang}'`">
        <pre :class="`language-${lang}`"><code ref="codeBlock" :class="`language-${lang}`"></code></pre>
      </div>
      <div class="line-numbers-wrapper">
        <span v-for="i in lineNumbers" :key="i">
          {{i}}
          <br/>
        </span>
      </div>
    </div>
  </template>
  
  <script>
  import Prism from 'prismjs';
  import 'prismjs/components/prism-markup';
  import 'prismjs/components/prism-css';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/components/prism-python';
  import 'prismjs/components/prism-json';
  // 导入其他需要的语言高亮模块
  
  export default {
    props: {
      lang: String,
      url: String,
    },
    data() {
      return {
        renderedCode: '',
        beforeContent: '',
        lineNumbers: 0,
      }
    },
    async mounted() {
        let prismLang;
        if (this.lang === 'vue') {
            prismLang = Prism.languages.markup;
        } else {
            prismLang = Prism.languages[this.lang];
        }

        if (!prismLang) {
            console.error(`Prism language module for "${this.lang}" not found.`);
            return;
        }
        const response = await fetch(`${this.url}?_=${Date.now()}`);
        const text = await response.text();
        this.renderedCode = Prism.highlight(text, prismLang, this.lang);
        this.$refs.codeBlock.innerHTML = this.renderedCode;
        this.handleLineNumber(this.renderedCode);
    },
    methods: {
      handleLineNumber(code) {
        const lineCount = code.split('\n').length;
        let lineNumbers = 0;
        for (let i = 1; i <= lineCount; i++) {
          lineNumbers ++;
        }
        this.lineNumbers = lineNumbers;
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .content-wrapper {
    position: relative;
    font-size: 16px;
    &::v-deep br {
        display: block;
    }
  }
  .codeWrapper {
    position: relative;
    &::before {
      position: absolute;
      top: 0.8em;
      right: 1em;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
      content: var(--before-content);
    }
  }
  
  .line-numbers-wrapper {
    position: absolute;
    top: 0;
    width: 3.5rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.3);
    padding: 1.25rem 0;
    line-height: 1.4;
    border-right: 1px solid rgba(0, 0, 0, 0.66);
  }
  // 因为是v-html渲染的，所以需要穿透
  ::v-deep pre {
    padding-left: 4.5rem !important;
    margin: 0 !important;
  }
  </style>
  