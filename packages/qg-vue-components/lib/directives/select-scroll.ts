
import scroll from './scroll';
import Vue, { DirectiveBinding} from 'vue';
import { DirectElement, Scroll } from '@/types/typing';

// 拷贝原有的指令
const newScroll = Object.assign({}, scroll);
// 给绑定的元素添加loading元素
const createLoadingDom = (el: DirectElement, binding: DirectiveBinding<Scroll<'El'>>) => {
    const divDom = document.createElement('div');
    divDom.setAttribute('id', 'my-div-dom');
    const selectNode = el.querySelector(binding.value?.el?.toString());
    selectNode && selectNode.appendChild(divDom);
    const { vm } = binding.value || {};
    // 使用element的loading图标，并添加一些文字
    const loadingDom:any = new Vue({
        data: {
            show: false,
        },
        render: h => loadingDom.show && h('div', {style: {'padding-left':'20px', color:'#999', 'font-size': '14px'}}, 
            [h('i', {class: 'el-icon-loading'}, null), h('span', {}, '加载更多')])
    });
    // 在使用的组件实例上绑定，便于后续操作data中的show，实现显示和隐藏
    vm && ((vm as Vue & {loadingDom:unknown}).loadingDom = loadingDom);
    // 添加nextTick，否则会有点问题
    Vue.nextTick(() => {
        loadingDom.$mount('#my-div-dom');
    });
};
// 重新定义bind方法，将上述自定义的添加dom方法与原有的监听滚动方法进行整合
newScroll.bind = (el, binding) => {
    createLoadingDom(el, binding);
    scroll.bind(el, binding);
};

export default newScroll;
