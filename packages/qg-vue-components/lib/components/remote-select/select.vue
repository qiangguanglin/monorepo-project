<template>
    <div>
        <el-select
            v-model="selectValue"
            v-new-scroll="scrollParams"
            class="my-select"
            :loading="loading"
            v-bind="$attrs"
            v-on="listeners"
            :filter-method="filterMethod"
            @clear="clear"
            @visible-change="visibleChange"
        >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
    </div>
</template>
<script lang="ts">
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import { ref, defineComponent, getCurrentInstance, Ref, computed } from 'vue';
import { DirectElement, Options } from '@/types/typing';

const SELECT_HEIGHT = 275;// 选择器高度
const SELECT_ITEM_HEIGHT = 34;// 每一项高度
const DEFAULT_OFFSET = 0;// 默认offset
const DEFAULT_LIMIT = 20;// 默认limit
const ZERO = 0;
const DEBOUNCE_TIME = 500;

export default defineComponent({
    name: 'RemoteSelect',
    props: {
        value: {
            type: [String, Number, Array],
            default: ''
        },
        useScroll: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: () => []
        },
        getMoreData: {
            type: Function,
            default: async () => {}
        },
    },
    setup(props, context) {
        const loading = ref(false);
        const options: Ref<Options[]> = ref([]);
        const instance = getCurrentInstance();
        const loadingDom: Ref<HTMLElement & {show:Boolean} | null> = ref(null);
        const scrollElement: Ref<HTMLElement | null> = ref(null);
        const isQuery = ref(false);
        const scrollParams:Ref<any> = ref({
            vm: instance?.proxy || null,
            el: '.el-select-dropdown .el-select-dropdown__wrap',
            element: null,
            handleScroll,
            handleInserted,
            offset: DEFAULT_OFFSET,
            limit: DEFAULT_LIMIT,
            total: ZERO
        });
        const selectValue = computed({
            get() {
                return props.value;
            },
            set(v) {
                context.emit('input', v);
            }
        });
        const listeners = computed(() =>{
            let res:{[key:string]: unknown} = {}
            for(let key in context.listeners) {
                if(!['change', 'visibleChange'].includes(key)) {
                    res[key] = context.listeners[key]
                }
            }
            return res
        })
        function defaultPaging() {
            scrollParams.value.offset = DEFAULT_OFFSET;
            scrollParams.value.limit = DEFAULT_LIMIT;
        };
        // 查询options
        async function setOptions(value: string | number | string[] | number[]) {
            loading.value = true;
            defaultPaging();
            const { offset, limit } = scrollParams.value || {};
            const params = { value, paging: {offset, limit} };
            try {
                const res = await props.getMoreData(params);
                options.value = res.list || [];
                scrollParams.value.total = res.total || ZERO;
            } catch(e) {
                noop();
            } finally {
                loading.value = false;
            }
        };
        // 滚动监听，下拉获取数据
        async function handleScroll(el: DirectElement, position: number) {
            scrollParams.value.element = el;
            let scrollBo = el.scrollTop - position > ZERO;
            if (props.useScroll) {
                if (!loadingDom.value?.show && scrollBo && el.scrollTop > options.value.length*SELECT_ITEM_HEIGHT-SELECT_HEIGHT && options.value.length < scrollParams.value.total) {
                    // 滚动条下移，当滚动高度达到当前options底部，并且接口返回的total还大于options时，说明还有数据，则继续请求接口
                    // 滑动到底部，展示loading元素
                    loadingDom.value && (loadingDom.value.show = true);
                    const { offset, limit } = scrollParams.value;
                    const params = { value: '', paging: {offset: offset+limit, limit} };
                    try {
                        const res = await props.getMoreData(params);
                        options.value.push(...res.list);
                        // 拿到新的数据之后，将offset累加
                        scrollParams.value.offset=offset+limit;
                    } catch(e) {
                        noop();
                    } finally {
                        // 将指令添加的loading元素隐藏
                        loadingDom.value && (loadingDom.value.show = false);
                    }
                }
            }
        };
        function handleInserted(el: DirectElement):void {
            scrollElement.value = el;
        };
        // 清空时按初始分页查一次
        function clear() {
            setOptions('');
            context.emit('clear');
        };
        // 添加防抖
        const filterMethod = debounce(function (query) {
            remoteMethod(query);
        }, DEBOUNCE_TIME);
        // 远程搜索
        async function remoteMethod(query: string | number | string[] | number[]) {
            loading.value = true;
            if(query) {
                isQuery.value = true;
            }
            await setOptions(query);
            loading.value = false;
        };
        // 下拉框出现事件
        function visibleChange(type: Boolean) {
            // 下拉框消失，并且是输入文字远程搜索的，同时没有选中下拉框内容时，重置下拉框内容为初始数据
            if(!type && isQuery.value && !selectValue.value && selectValue.value !== ZERO) {
                isQuery.value = false;
                setOptions('');
            }
        }
        // 初始化options
        setOptions('');
        return {
            loading,
            options,
            loadingDom,
            scrollElement,
            isQuery,
            scrollParams,
            selectValue,
            listeners,
            clear,
            filterMethod,
            visibleChange,
        }
    },
});
</script>

<style>

</style>