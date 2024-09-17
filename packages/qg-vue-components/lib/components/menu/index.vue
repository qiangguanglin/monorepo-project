<template>
    <el-menu>
        <my-menu :data="menuList"></my-menu>
            </el-menu>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';
import { MenuItem } from '@/types/typing';
import MyMenu from './menu.vue';

export default defineComponent({
    name: 'QgMenu',
    components: {
        MyMenu
    },
    props: {
        menuList: {
            type: Array as PropType<MenuItem[]>,
            default: () => []
        }
    },
    setup(props) {
        const menuList = ref(props.menuList)
        return {
            menuList
        }
    }
})

</script>
<style scoped lang="scss">
::v-deep .el-menu-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
</style>