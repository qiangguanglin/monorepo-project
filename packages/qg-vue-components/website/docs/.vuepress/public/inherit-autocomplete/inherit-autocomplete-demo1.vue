<template>
    <div>
        <qg-inherit-autocomplete
            ref="autocomplete"
            class="inherit-input2"
            v-model="value1"
            size="small" 
            placeholder="我透传部分插槽"
            :clearable="true"
            :fetch-suggestions="querySearch"
            @focus="focus"
            @blur="blur"
        >
            <template v-slot:prefix>
                <div class="fix">前</div>
            </template>
            <template v-slot:suffix>
                <i class="el-icon-edit"></i>
            </template>
            <template v-slot:prepend>
                <div>无效的插槽</div>
            </template>
            <template v-slot:append>
                <div>我是重新定义的插槽</div>
            </template>
            <template v-slot={item}>
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
            </template>
        </qg-inherit-autocomplete>
        <div>{{eventText}}</div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'InheritAutocompleteDemo1',
    setup() {
        const value1 = ref('');
        const restaurants = [
            { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
            { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        ];
        const eventText = ref('');
        function querySearch(queryString: string, cb: (params: any) => void) {
            const results = queryString ? restaurants.filter(createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        }
        function createFilter(queryString: string) {
            return (restaurant: {value: string, address: string}) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        }
        function focus() {
            eventText.value='触发了聚焦事件'
        }
        function blur() {
            eventText.value='触发了失焦事件'
        }
        return {
            value1,
            eventText,
            focus,
            blur,
            querySearch
        }
    }
})
</script>

<style scoped lang="scss">
/* 样式 */
::v-deep .inherit-input2 .el-input__suffix {
    display: flex;
    align-items: center;
}
::v-deep .el-input__prefix {
    display: flex;
    align-items: center;
}
</style>