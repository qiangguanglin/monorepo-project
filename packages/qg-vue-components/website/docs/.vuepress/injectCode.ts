import container from 'markdown-it-container';
// .vuepress/injectSourceCode.js

export default (options, context) => ({
    extendMarkdown(md) {
      md.use(container, 'source', {
        validate(params) {
          return params.trim().match(/^source\s+(.*)$/);
        },
        render(tokens, idx) {
          if (tokens[idx].nesting === 1) {
            const filePath = tokens[idx].info.trim().match(/^source\s+(.*)$/)[1];
            return `<pre><code class="language-vue"><script type="text/vue-source" src="${filePath}"></script></code></pre>`;
          }
          return '';
        },
      });
    },
    enhanceAppFiles: [
        {
          name: 'load-source-code',
          content: `
            export default ({ Vue }) => {
              Vue.mixin({
                mounted() {
                    console.log('0=======')
                  this.$nextTick(() => {
                    const scripts = document.querySelectorAll('script[type="text/vue-source"]');
                    scripts.forEach(async (script) => {
                        const filePath = script.getAttribute('src');
                        const response = await fetch(filePath);
                        console.log('0=======0033333', filePath, response, script);
                        const sourceCode = await response.text();
                        if(script.parentElement && !script.parentElement.textContent){
                            script.parentElement.textContent = sourceCode;
                        }
                    });
                  });
                },
              });
            };
          `,
        },
      ],
  });