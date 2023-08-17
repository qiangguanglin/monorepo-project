import debounce from 'lodash/debounce';
import { DirectiveBinding } from 'vue';
import { DirectElement } from '@/types/typing';

export default {
    inserted(el: DirectElement, binding:DirectiveBinding<() => void> ) {
        el.handler = debounce(binding.value, Number(binding.arg) || 1000)
        el.addEventListener('click', el.handler)
    },
    unbind(el: DirectElement) {
        el.removeEventListener('click', el.handler)
    }
}