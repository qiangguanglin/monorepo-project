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
    $value: string,
    handler: () => void
}

export {
    MenuItem,
    TableColumn,
    SelectItem,
    DirectElement
}