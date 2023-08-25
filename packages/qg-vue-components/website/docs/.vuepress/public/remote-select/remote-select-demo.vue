<template>
    <div>
        <remote-select
            v-model="selectVal"
            clearable
            filterable
            placeholder="可按名称或id搜索"
            no-data-text="无数据"
            :get-more-data="getMoreData"
            :use-scroll="true"
        />
        <div>{{selectVal}}</div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { originData } from './config';
import { Options, RemoteParams } from '../../../types/config';

export default defineComponent({
    name:'RemoteSelectDemo',
    setup() {
        const selectVal = ref([]);
        async function getMoreData(searchParams:RemoteParams) {
            const { value, paging: { offset, limit } } = searchParams || {};
            let res:Options[]  = [];
            const total = originData.total;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if(searchParams.value) {
                        const tempRes = originData.list?.find((v:Options)  => v.value === value || +v.value === +value || v.label === value)
                        res = tempRes ? [tempRes] : []
                    } else {
                        res = originData.list.slice(offset, offset + limit);
                    }
                    resolve({list: res, total })
                }, 1000)
            })
        }
        return {
            selectVal,
            getMoreData
        }
    }
})
</script>