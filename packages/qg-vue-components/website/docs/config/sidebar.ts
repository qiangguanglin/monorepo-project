import { SidebarItem } from '../../types/config';
// 中文左侧导航栏
const zhSidebar: SidebarItem[] = [
    // 首页-介绍
    ['/guide/', '介绍'],
    {
      title: '组件',
      collapsable: false,
      children: [
        ['../guide/Input', 'Input']
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