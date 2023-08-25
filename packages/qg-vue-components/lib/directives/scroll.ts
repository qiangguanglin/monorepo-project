import { DirectElement, Scroll } from '@/types/typing';
import { DirectiveBinding } from 'vue';

export default {
    name: 'scroll',
    bind(el: DirectElement, binding: DirectiveBinding<Scroll<'El'>>) {
        // 获取滚动页面DOM
        let scrollDom: DirectElement | null;
        const bindParams = binding.value;
        if (bindParams.el && bindParams.el.nodeType === 1) {
            // 参数是HTML ELEMENT
            scrollDom = bindParams.el;
        } else if (bindParams.el) {
            // 参数是其他
            scrollDom = el.querySelector(bindParams.el.toString());
        } else {
            // 没有这个参数，使用绑定元素本身
            scrollDom = el;
        }
        // 设置了handleBind，触发handleBind
        typeof bindParams.handleBind === 'function' && bindParams.handleBind(el);
        // handleScroll校验
        if (!bindParams.handleScroll) {
            return console.error('TypeError: v-scroll expected a "handleScroll" param in binding!');
        } else if (typeof bindParams.handleScroll !== 'function') {
            return console.error('TypeError: "handleScroll" should be a function!');
        }
        // beginPosition记录滚动的元素的当前scrollTop，并作为参数传入handleScroll，可用于判断滚动方向
        let beginPosition = scrollDom?.scrollTop;
        scrollDom?.addEventListener('scroll', function() {
            bindParams.handleScroll(scrollDom, beginPosition || 0);
            beginPosition = this.scrollTop;
        });
    },
    inserted: function(el: DirectElement, binding: DirectiveBinding<Scroll<'str'>>) {
        const { handleInserted } = binding.value;
        if (!handleInserted) {
            return;
        }
        if (typeof handleInserted !== 'function') {
            return console.error('TypeError: "handleInserted" should be a function!');
        }
        handleInserted(el);
    }
};
