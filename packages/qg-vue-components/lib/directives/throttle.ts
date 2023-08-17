import throttle from 'lodash/throttle';
import { DirectiveBinding } from 'vue';
import { DirectElement } from '@/types/typing';

export default {
    inserted(el: DirectElement, binding: DirectiveBinding<()=>void>) {
        el.handler = throttle(binding.value, Number(binding.arg) || 1000)
        el.addEventListener('input', el.handler)
    },
    unbind(el: DirectElement) {
        el.removeEventListener('click', el.handler)
    }
}