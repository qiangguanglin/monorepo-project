<template>
    <qg-menu :menuList="menuList"/>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
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