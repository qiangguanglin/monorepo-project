<template>
    <div>
        <el-input size="small" v-model="tempValue"/>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
    name:"qgInput",
    props: {
        value: null
    },
    setup(props, context) {
        // 计算属性
        const tempValue = computed({
            get: () => props.value,
            set: (v) => {
                context.emit('input', v);
            }
        });
        return {
            tempValue
        };
    }
})



</script>

<style scoped lang="scss">
/* 样式 */
</style>