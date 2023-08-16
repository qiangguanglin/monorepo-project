import components from './components/index';
import Vue, { VueConstructor } from 'vue';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import utils from './utils/index';
import directives from './directives'

Vue.use(element);
const install = (vue:VueConstructor, opts={}) => {
    components.forEach((component) => {
        vue.component(component.name, component);
    });
    for(const key in utils) {
        vue.prototype[`$${key}`] = (utils as any)[key];
    }
    for(const key in directives) {
        vue.directive(key, (directives as any)[key]);
    }
}
export default {
    install
}