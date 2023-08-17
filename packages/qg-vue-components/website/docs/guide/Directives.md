### 基础用法

## 点击元素外部指令
该指令可以实现点击绑定元素的外部触发
<source-block>
    <template v-slot:comp>
        <press-row>
            <click-outside-demo/>
        </press-row>
    </template>
    <template v-slot:code>
        <source-code lang="vue" url="/directives/click-outside-demo.vue"/>
    </template>
</source-block>

## 防抖指令
该指令可以实现点击事件防抖
<source-block>
    <template v-slot:comp>
        <press-row>
            <debounce-demo/>
        </press-row>
    </template>
    <template v-slot:code>
        <source-code lang="vue" url="/directives/debounce-demo.vue"/>
    </template>
</source-block>

## 节流指令
该指令可以实现输入框节流
<source-block>
    <template v-slot:comp>
        <press-row>
            <throttle-demo/>
        </press-row>
    </template>
    <template v-slot:code>
        <source-code lang="vue" url="/directives/throttle-demo.vue"/>
    </template>
</source-block>

## 拖拽指令
该指令可以实现元素拖拽，需要设置其父元素为绝对定位，fatherId为其指定父元素的id，用于获取其宽高
<source-block>
    <template v-slot:comp>
        <press-row>
            <draggable-demo/>
        </press-row>
    </template>
    <template v-slot:code>
        <source-code lang="vue" url="/directives/draggable-demo.vue"/>
    </template>
</source-block>

## 复制指令
该指令可以实现元素内容一键复制
<source-block>
    <template v-slot:comp>
        <press-row>
            <copy-demo/>
        </press-row>
    </template>
    <template v-slot:code>
        <source-code lang="vue" url="/directives/copy-demo.vue"/>
    </template>
</source-block>