import qgComponents from '../../../lib/index';
import { VueConstructor } from 'vue';
import demoComponents from './public/index';
import MarkdownIt from 'markdown-it';

export default ({ Vue, options }: { Vue: VueConstructor, options: { markdown: MarkdownIt} }) => {
    Vue.use(qgComponents);
    demoComponents.forEach(com => {
        Vue.component(com.name, com)
    });
}