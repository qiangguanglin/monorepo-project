interface MenuItem {
    value: string,
    label: string,
    icon?: string,
    children?: MenuItem[]
}

interface TableColumn {
    prop: string,
    label: string,
    children?: TableColumn[],
    [keys:string]: unknown 
}

interface SelectItem {
    value: string | number,
    label: string
}

interface DirectElement extends HTMLElement {
    $value?: string,
    handler: () => void
}

interface El extends HTMLElement {
    nodeType:number,
    handler: () => void
}

type TypeMap = {
    str: string,
    El: El
}

type ScrollEl<T extends keyof TypeMap> = TypeMap[T]

type Scroll<T> = {
    vm: any,
    el: ScrollEl<T>,
    element: HTMLElement | null,
    handleScroll: (el: DirectElement | null, position: number) => Promise<void>,
    handleInserted?: (el: DirectElement) => void,
    offset: number,
    limit: number,
    total: number,
    handleBind?: (el: DirectElement) => void
}

interface Options {
    value: number | string,
    label: string
}

export {
    MenuItem,
    TableColumn,
    SelectItem,
    DirectElement,
    Scroll,
    ScrollEl,
    El,
    Options
}