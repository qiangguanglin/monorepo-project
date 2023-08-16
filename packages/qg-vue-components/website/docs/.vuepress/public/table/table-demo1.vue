<template>
	<div>
		<h3 class="title">二次封装表格</h3>
		<div class="button_group">
			<el-button type="primary" size="small" @click="clearSelect">清除选择</el-button>
			<el-button type="primary" size="small" @click="clearSort">清除排序</el-button>
		</div>
		<qg-table
			ref="table"
			:columns="columns"
			:data="tableData"
			style="width: 100%"
			:default-sort = "{prop: 'date', order: 'descending'}"
			border
			stripe
			:pagination="{
                pageSizes: [2,5],
			}"
		>
			<template v-slot:header-name="scope">
				<el-input v-model="search" size="mini" :placeholder="`输入关键字搜索<${scope.column.label}>`">
				</el-input>
			</template>
			<template v-slot:operate="scope">
				<el-input v-model="scope.row.operate">
					<template v-slot:prefix>
						<i>1111</i>
					</template>
				</el-input>
			</template>
			<template v-slot:date="scope">
				我是日期：{{scope.row.date}}
			</template>
			<template v-slot:append>
				<span style="padding:20px">我是append插槽</span>
			</template>
		</qg-table>
	</div>
</template>

<script lang="ts">
import {ref, defineComponent, Ref, onMounted} from 'vue';
import { columns, tableData } from './config';
import {Table} from 'element-ui';

export default defineComponent({
    name: 'TableDemo1',
    setup(props, context) {
        const tempColumns = ref(columns);
        const tempTableData = ref(tableData);
        const search = ref('');
        const table: Ref<Table | null> = ref(null)
        function clearSelect() {
            table.value?.clearSelection();
        }
        function clearSort() {
            table.value?.clearSort()
        }
        return {
            columns: tempColumns,
            tableData: tempTableData,
            search,
            table,
            clearSelect,
            clearSort,
        }
    },
})
</script>

<style scoped lang="scss">
.button_group {
    padding: 10px 0;
    float: right
}
.title{
	padding: 10px 0
}
</style>