import qgComponents from '../../../lib/index';
import { VueConstructor } from 'vue';
import demoComponents from './public/index';

export default ({ Vue, options }: { Vue: VueConstructor, options: unknown }) => {
    Vue.use(qgComponents);
    demoComponents.forEach(com => {
        Vue.component(com.name, com)
    });
}