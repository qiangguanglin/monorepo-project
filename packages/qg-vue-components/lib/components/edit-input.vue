<template>
    <div class="content">
        <span v-show="status">{{ value || '--' }}</span>
        <el-input
            v-show="!status"
            ref="input"
            v-model.trim="tempValue"
            size="mini"
            class="input_style"
            :clearable="true"
            @blur="blur"
        />
        <div v-show="status" class="pencil_icon" @click="click">
            <img src="../assets/pencil.png" class="pencil_class"/>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, Ref, nextTick } from 'vue';

export default defineComponent({
    name: 'qgEditInput',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        canEdit: {
            type: Boolean,
            default: true,
        },
        valueType: {
            type: Number,
        }
    },
    setup(props, context) {
        const status = ref(true);
        const originValue:Ref<string | number> = ref('');
        const input:Ref<HTMLElement | null> = ref(null);
        const tempValue = computed({
            get() {
                return props.value;
            },
            set(v) {
                context.emit('input', v);
            }
        })
        function click() {
            status.value = false;
            originValue.value = props.value;
            nextTick(() => {
                input.value?.focus();
            });
        }
        function blur() {
            status.value = true;
            if(tempValue.value !== originValue.value) {
                context.emit('change-value', props.valueType, originValue.value);
            }
            context.emit('blur', tempValue.value);
        }
        return {
            status,
            originValue,
            input,
            tempValue,
            click,
            blur
        }
    },
});
</script>

<style scoped lang="scss">
::v-deep.el-link.is-underline:hover::after {
    border-bottom: none;
}
.content {
    display: flex;
    align-items:center;
}
.pencil_class {
    padding: 5px 5px 0px;
    width:14px;
    height:14px;
}
.pencil_icon {
    cursor: pointer;
}
</style>