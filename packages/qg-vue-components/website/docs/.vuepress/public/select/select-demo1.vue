<template>
    <div>
        <qg-select 
            :list="list"
            clearable
            @change="change"
        />
        <div>{{selectVal}}</div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref } from 'vue';
import { list } from './config';

export default defineComponent({
    name:'SelectDemo1',
    setup() {
        const tempList = ref(list);
        const selectVal: Ref<string | number> = ref('');
        function change(v: string | number) {
            selectVal.value = v;
        }
        return {
            list: tempList,
            selectVal,
            change
        }
    }
})
</script>