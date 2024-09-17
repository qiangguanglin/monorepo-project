<template>
<div>
    <input class="input" v-model="text" />
    <div>{{ text }}</div>
</div>
</template>

<script lang="ts">
import { ref, customRef, defineComponent } from 'vue';

let timer: any;
function debounceRef(value: any, duration = 1000) {
    return customRef<any>((track, trigger) => {
        return {
            get() {
                track();// 依赖收集
                return value;
            },
            set(val) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    trigger();// 派发更新
                    value = val;
                }, duration)
            }
        }
    })
}

export default defineComponent({
    name: 'CustomDebounceDemo1',
    setup() {
        const text = debounceRef('');
        return {
            text
        }
    }
})
</script>
<style lang="scss">
.input {
    height: 32px;
    line-height: 32px;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
}
</style>