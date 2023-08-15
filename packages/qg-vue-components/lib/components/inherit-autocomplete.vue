<template>
    <div class="inherit_content">
        <el-autocomplete
            v-model="tempValue"
            v-bind="$attrs"
            v-on="$listeners"
        >
            <template v-for="(slot, name) in $slots" v-slot:[name]>
                    <slot v-if="!ignore_slot.includes(`${name}`) && name !== 'default'" :name="name"></slot>
            </template>
            <template v-slot="data">
                <slot v-bind="data"></slot>
            </template>
        </el-autocomplete>
        <div class="append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'qgInheritAutocomplete',
    props: {
        value: {
            type: null
        }
    },
    setup(props, context) {
        const ignore_slot = ref(['prepend', 'append']);
        const tempValue = computed({
            get() {
                return props.value 
            },
            set(v) {
                context.emit('input', v)
            }
        });
        return {
            ignore_slot,
            tempValue,
        }
    },
})
</script>

<style scoped lang="scss">
.inherit_content {
    display: flex;
}
.append {
    width: 50%;
    line-height: 32px;
}
</style>