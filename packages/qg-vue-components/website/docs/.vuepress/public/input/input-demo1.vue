<template>
    <div>
        <qg-input v-model="inputValue"></qg-input>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'InputDemo1',
    setup() {
        const inputValue = ref('我是初始值');
        return {
            inputValue
        }
    }
})

</script>

<style scoped lang="scss">
/* 样式 */
</style>