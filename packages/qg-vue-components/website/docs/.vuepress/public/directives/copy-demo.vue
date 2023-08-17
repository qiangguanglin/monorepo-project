<template>
    <span v-copy="copyText">我是复制的内容</span>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
    name: 'CopyDemo',
    setup() {
        const instance = getCurrentInstance();
        function copyText(v) {
            instance?.proxy?.$message.success(`复制的值为：${v}`)
        }
        return {
            copyText
        }
    }
})
</script>