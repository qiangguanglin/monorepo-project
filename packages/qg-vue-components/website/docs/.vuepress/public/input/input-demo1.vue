<template>
    <div>
        <qg-input v-model="inputValue"></qg-input>
    </div>
</template>

<script lang='ts'>
 export default {
    name:"input-demo1"
 }
</script>
<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref('我是初始值')
</script>

<style scoped lang="scss">
/* 样式 */
</style>