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
  
<script lang="ts">
import { ref, defineComponent, onMounted, Ref } from 'vue';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
// 导入其他需要的语言高亮模块

export default defineComponent({
  name: 'sourceCode',
  props: {
    lang: {
      type: String,
      default: 'vue'
    },
    url: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const renderedCode = ref('');
    const beforeContent = ref('');
    const lineNumbers = ref(0);
    const codeBlock: Ref<HTMLElement | null> = ref(null);
    function handleLineNumber(code:string) {
      const lineCount = code.split('\n').length;
      let count = 0;
      for (let i = 1; i <= lineCount; i++) {
        count ++;
      }
      lineNumbers.value = count;
    }
    onMounted(async () => {
      let prismLang;
      if (props.lang === 'vue') {
          prismLang = Prism.languages.markup;
      } else {
          prismLang = Prism.languages[props.lang];
      }

      if (!prismLang) {
          console.error(`Prism language module for "${props.lang}" not found.`);
          return;
      }
      const response = await fetch(`${props.url}?_=${Date.now()}`);
      const text = await response.text();
      renderedCode.value = Prism.highlight(text, prismLang, props.lang);
      (codeBlock.value as HTMLElement).innerHTML = renderedCode.value;
      handleLineNumber(renderedCode.value);
    })

    return {
      renderedCode,
      beforeContent,
      lineNumbers,
      codeBlock
    }
  }
})
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
  