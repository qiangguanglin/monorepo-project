### Basic Usage

## Click Outside Directive
This directive can be used to trigger an action when clicking outside the bound element.
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

## Debounce Directive
This directive can be used to implement debounce for click events.
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

## Throttle Directive
This directive can be used to implement throttle for input boxes.
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

## Draggable Directive
This directive can be used to implement element dragging. It requires setting its parent element to absolute positioning. The fatherId is the specified parent element's id, used to obtain its width and height.
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

## Copy Directive
This directive can be used to implement one-click copying of element content.
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