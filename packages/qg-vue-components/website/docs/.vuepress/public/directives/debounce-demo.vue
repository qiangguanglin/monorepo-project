<template>
    <el-button type="primary" v-debounce:[time]="clickDebounce">防抖按钮</el-button>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
    name: 'DebounceDemo',
    setup() {
        const time = ref(2000);
        const instance = getCurrentInstance();
        function clickDebounce() {
            instance?.proxy?.$message.info('我在2s内只触发一次')
        }
        return {
            time,
            clickDebounce
        }
    }
})
</script>