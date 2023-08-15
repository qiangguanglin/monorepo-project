<template>
    <div>
        <qg-edit-input v-model="inputValue"></qg-edit-input>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'EditInputDemo1',
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