<template>
    <qg-menu class="qg-menu" :menuList="menuList"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { menuList } from './config';

export default defineComponent({
    name: 'MenuDemo1',
    setup() {
        return {
            menuList
        }
    }
})
</script>
<style lang="scss" scoped>
.qg-menu {
    width: 180px;
}
</style>