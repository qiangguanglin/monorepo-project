<template>
    <div>
        <inherit-input
            class="inherit-input1"
            size="small" 
            v-model="value1" 
            placeholder="我是新的继承组件"
            :minlength="1"
            :maxlength="8"
            clearable
            @focus="focus"
            @blur="blur"
        >
            <template v-slot:prefix>
                <i class="el-icon-edit"></i>
            </template>
        </inherit-input>
        <div>{{eventText}}</div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'InheritInputDemo1',
    setup() {
        const value1 = ref('我是新组件');
        const eventText = ref('');
        function focus() {
            eventText.value='触发了聚焦事件';
        }
        function blur() {
            eventText.value='触发了失焦事件';
        }
        return {
            value1,
            eventText,
            focus,
            blur
        }
    }
})
</script>

<style scoped lang="scss">
/* 样式 */
</style>