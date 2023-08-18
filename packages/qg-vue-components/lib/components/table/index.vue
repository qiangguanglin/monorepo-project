<template>
	<div>
		<el-table
			class="my-table"
			v-loading="loading"
			ref="table"
			:data="tempData"
			:header-cell-style="headerCellStyle"
			:cell-style="cellStyle"
			v-bind="$attrs"
			v-on="$listeners"
		>
			<template slot="append">
				<slot name="append"></slot>
			</template>
			<component :is="newTableColumn" :columns="columns">
				<template v-for="(index, name) in $slots" v-slot:[name]>
					<slot :name="name"></slot>
				</template>
				<template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
					<slot :name="name" v-bind="data"></slot>
				</template>
			</component>
		</el-table>
		<el-pagination 
			class="pagination"
			v-bind="tempPagination"
			:current-page="currentPage"
			:page-size="pageSize"
			:total="total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		></el-pagination>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, watch, onMounted, Ref, getCurrentInstance, PropType } from 'vue';
import NewTableColumn from './new-table-column.vue';
import { TableColumn } from '@/types/typing';

const defaultPagination = {background: true, layout: 'total, sizes, prev, pager, next, jumper'}
export default defineComponent({
	name: 'QgTable',
	props: {
		columns: {
			type: Array as PropType<TableColumn[]>,
			default: () => ([])
		},
		pagination: {
			type: Object,
			default: () => ({})
		},
		data: {
			type: Array,
			default: () => []
		},
		headerCellStyle: {
			type: Function || Object,
			default: () => {
				return {
					'background-color': '#f5f6f7',
					'font-size': '12px',
					'padding': '10px',
				}
			}
		},
		cellStyle: {
			type: Function || Object,
			default: () => {
				return {
					'font-size': '12px',
					'padding': '10px'
				}
			}
		},
		
	},
    setup(props, context) {
        const loading = ref(false);
        const currentPage = ref(1);
        const pageSize = ref(10);
        const tempData: Ref<any[]> = ref([]);
        const newTableColumn = ref(NewTableColumn);
        const table: Ref<HTMLElement | null> = ref(null);
        const paging = computed(() => {
            const offset = (currentPage.value - 1) * pageSize.value;
            return { offset, limit: pageSize.value }
        });
        const total = computed(() => {
            return props.data?.length || 0
        });
        const tempPagination = computed(() => {
            return {...defaultPagination, ...props.pagination}
        });
        watch(() => props.pagination, (newVal) => {
            currentPage.value = newVal.currentPage || 1;
            pageSize.value = newVal.pageSize || newVal.pageSizes?.[0] || 10
        },{immediate: true, deep: true});
        watch(paging, (nVal) => {
            getTableData()
        }, {immediate: true,deep: true,});
        onMounted(() => {
            const tempStore: any = table || {};
            const instance = getCurrentInstance();
            for(const key in tempStore.value) {
                if(typeof tempStore.value[key] === 'function' && instance?.proxy) {
                    (instance.proxy as any)[key] = tempStore.value[key]
                }
            }
        });
        function getTableData() {
            const { offset, limit } = paging.value || {}
		    loading.value = true
			setTimeout(() => {
				tempData.value = props.data.filter((v, i) => i >= offset && i < (offset + limit))
				loading.value = false
			}, 1000);
        };
        function handleSizeChange(val:number) {
			pageSize.value = val;
			getTableData();
		};
		function handleCurrentChange(val:number) {
			currentPage.value = val;
			getTableData();
		};
        return {
            loading,
            currentPage,
            pageSize,
            tempData,
            newTableColumn,
            table,
            paging,
            total,
            tempPagination,
            handleSizeChange,
            handleCurrentChange,
            columns: props.columns
        }
    },
})
</script>

<style scoped lang="scss">
.pagination {
	display: flex;
	padding: 10px 0;
	::v-deep button.btn-prev {
		margin-left:auto
	}
}
.my-table ::v-deep .is-group tr:nth-child(odd) {
    display: none;
}
</style>