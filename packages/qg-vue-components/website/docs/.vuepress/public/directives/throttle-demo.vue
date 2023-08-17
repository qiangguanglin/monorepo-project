<template>
    <el-input style="padding:0 10px;width:200px;" v-model="value" v-throttle:[time]="throttleInput" placeholder="节流输入框"/>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
    name: 'ThrottleDemo',
    setup() {
        const value = ref('');
        const time = ref(2000);
        const instance = getCurrentInstance();
        function throttleInput(event) {
            instance?.proxy?.$message.info(`我2s触发一次，值是${event?.target?.value}`)
        }
        return {
            value,
            time,
            throttleInput
        }
    }
})
</script>