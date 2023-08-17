<template>
    <el-button type="primary" v-clickOutside="clickOutside">点击外面按钮</el-button>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
    name: 'ClickOutsideDemo',
    setup() {
        const instance = getCurrentInstance();
        function clickOutside() {
            instance?.proxy?.$message.info('点击了外面');
        }
        return {
            clickOutside
        }
    }
})
</script>