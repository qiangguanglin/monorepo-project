<template>
    <div style="position: relative; width: 100%;height: 100px">
        <div id="my-father-dom" style="position: absolute;width:calc(100% - 20px);height:100px;">
            <el-button type="primary" style="display: inline-block;position:relative;" v-draggable:[fatherId]>我是拖拽区域</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'DraggableDemo',
    setup() {
        const fatherId = ref('my-father-dom');
        return {
            fatherId
        }
    }
})
</script>