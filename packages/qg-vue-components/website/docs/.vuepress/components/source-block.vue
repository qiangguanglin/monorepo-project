<template>
    <div class="source-block">
      <div class="comp-container">
        <slot name="comp"></slot>
      </div>
      <div class="code-container" v-if="isShow">
        <slot name="code"></slot>
      </div>
      <div
        class="is-show-code"
        :style="{ borderTop: isShow ? '1px solid #ebebeb' : 'none' }"
        @click="toggleState"
      >
        {{ toggleText }}
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
const isShow = ref(false);
const toggleText = computed(() => isShow.value ? '收起' : '展开');
function toggleState() {
    isShow.value = !isShow.value;
}
</script>

<style lang="scss" scoped>
.source-block {
  border: 1px solid #ebebeb;
  border-radius: 4px;
  .comp-container {
      padding: 10px;
      border-bottom: 1px solid #ebebeb;
      overflow: auto;
  }
  .is-show-code {
      line-height: 44px;
      text-align: center;
      background-color: #fff;
      font-size: 14px;
      color: #d3dce6;
      transition: all 0.2s;
      &:hover {
      color: #3eaf7c;
      cursor: pointer;
      }
  }
}
::v-deep br {
  display: none;
}
</style>