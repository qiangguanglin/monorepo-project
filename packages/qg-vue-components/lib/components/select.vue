<template>
    <div>
        <el-select 
            v-model="tempValue" 
            placeholder="请选择"
            v-bind="$attrs"
            v-on="listeners"
        >
            <el-option
                v-for="item in list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
  </el-select>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { SelectItem } from '@/types/typing';

export default defineComponent({
    name: 'QgSelect',
    props: {
        list: {
            type: Array as PropType<SelectItem[]>,
            value: () => ([])
        },
        value: {
            type: null
        }
    },
    setup(props, context) {
        const tempValue = computed({
            get() {
                return props.value
            },
            set(v) {
                context.emit('change', v)
            }
        });
        const listeners = computed(() => {
            let res:{[key:string]: unknown} = {}
            for(let key in context.listeners) {
                if(key !== 'change') {
                    res[key] = context.listeners[key]
                }
            }
            return res
        });
        return {
            tempValue,
            listeners,
            list: props.list,
            value: props.value
        }
    },
})
</script>