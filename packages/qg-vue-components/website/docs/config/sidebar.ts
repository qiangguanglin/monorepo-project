import { SidebarItem } from '../../types/config';
// 中文左侧导航栏
const zhSidebar: SidebarItem[] = [
    // 首页-介绍
    ['/guide/', '介绍'],
    {
      title: '组件',
      collapsable: false,
      children: [
        ['../guide/Input', '输入框'],
        ['../guide/EditInput', '可编辑输入框'],
        ['../guide/InheritAutocomplete', '继承的自动完成输入框'],
        ['../guide/InheritInput', '继承的输入框'],
        ['../guide/Menu', '递归菜单栏'],
        ['../guide/Table', '表格'],
        ['../guide/Select', '选择器'],
        ['../guide/Hoc', '高阶组件']
      ]
    }
]
// 英文左侧导航栏
const enSidebar: SidebarItem[] = [
    // 首页-介绍
    ['/en/guide/', 'Introduce'],
    {
        title: 'components',
        collapsable: false,
        children: [
            ['../en/guide/Input', 'Input']
        ]
    }
]

export {
    zhSidebar,
    enSidebar
}