<template>
    <div>
        <Hoc
            :model="data"
            :config="config"
            @input="input"
            @change="change"
            @blur="blur"
            @select="handleSelect"
        >
            <template v-slot:header>
                <h2 style="padding-bottom: 20px;">我是高阶组件</h2>
            </template>
            <template v-slot:prefix>
                <i class="el-icon-date" style="margin-top: 13px;" comType="input"></i>
            </template>
            <template v-slot:autocomplete_default="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
            </template>
        </Hoc>
        <div>{{data}}</div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, getCurrentInstance } from 'vue';
import { Input, Switch, Rate, Autocomplete } from 'element-ui';
import MySelect from '../../../../../lib/components/select.vue';
import { getConfig } from './config';
import HOC from '../../../../../lib/utils/HOC';

const getHOC: (comMap: any) => any = HOC;
const Hoc = getHOC({input: Input, mySelect: MySelect, switch: Switch, rate: Rate, autocomplete: Autocomplete});
export default defineComponent({
    name: 'HocDemo1',
    components: {
        Hoc
    },
    setup() {
        const data = ref({
            inputValue: '',
            autocompleteValue: '',
            selectValue: '',
            switchValue: false,
            rateValue: 0,
        })
        function querySearch(queryString, cb) {
            const results = queryString ? restaurants.filter(createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        }
        const config = getConfig(querySearch);
        const restaurants = loadAll();
        function change(v) {
            console.log('change:', v);
        }
        function input(v) {
            console.log('input: ', v)

        }
        function blur(e) {
            console.log('blur: ', e)
        }
        function handleSelect(item) {
            console.log('select: ', item);
        }
        const instance = getCurrentInstance();
        function createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        }
        function loadAll() {
            return [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
            ]
        }
        return {
            data,
            config,
            restaurants,
            change,
            input,
            blur,
            handleSelect,
            createFilter
        }
    }
})
</script>