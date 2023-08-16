export default function getHOC(comMap) {
    const ignoreArr = ['change', 'input']
    return {
        computed: {
            // 过滤掉input和change事件监听
            listeners() {
                const res = {}
                for(let key in this.$listeners) {
                    if(!ignoreArr.includes(key)) {
                        res[key] = this.$listeners[key]
                    }
                }
                return res
            },
            // 处理插槽
            slotsMap() {
                const tempSlotsMap = Object.keys(this.$slots)
                .reduce((arr, cc) => {
                    const slot = this.$slots[cc][0]
                    const type = slot.data?.attrs?.comType || 'default'
                    if(!arr[type]) {
                        arr[type] = []
                    }
                    slot.context = this._self
                    arr[type].push(slot)
                    return arr
                }, {})
                return tempSlotsMap
            }
        },
        methods: {
            // 处理scopedSlot插槽
            handleScopeSlots(slots, name) {
                let slotsMap = {}
                for(let key in slots) {
                    const res = key.split('_')
                    if(res[0]===name) {
                        slotsMap[res[1]]=slots[key]
                    }
                }
                return slotsMap
            },
            // 处理渲染dom
            handleNodes(h) {
                const { config, model } = this.$attrs || {}
                let hArr = []
                for(let key in comMap) {
                    const slots = this.slotsMap[key]
                    const scopedSlots = this.handleScopeSlots(this.$scopedSlots, key)
                    hArr = [...hArr, h(comMap[key], {
                        props: {
                            value: model ? model[config?.[key]?.prop] : '',
                            ...(this.$props?.config?.[key] || {})
                        },
                        attrs: {
                            key: `${key}-${config[key].prop}`,
                            ...config[key],
                        },
                        on: {
                            change: (v) => {
                                model[config?.[key]?.prop] = v
                                this.$emit('change', {prop: config[key].prop, v})
                            },
                            input: (v) => {
                                model[config?.[key]?.prop] = v
                                this.$emit('input', {prop: config[key].prop, v})
                            },
                            ...this.listeners
                        },
                        style: {
                            marginBottom: '10px',
                            maxWidth: '300px',
                            ...(config?.[key]?.style || {})
                        },
                        scopedSlots: scopedSlots
                    }, slots || null)]
                }
                return hArr
            }
        },
        render(h) {
            const nodes = this.handleNodes(h)
            return h('div', null, [
                h('div', null, this.slotsMap.default),
                ...nodes
            ])
        }
    }
}