import components from './components/index';
import Vue, { VueConstructor } from 'vue';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(element);
const install = (Vue:VueConstructor, opts={}) => {
    components.forEach((component) => {
        Vue.component(component.name, component);
    })
}
export default {
    install
}