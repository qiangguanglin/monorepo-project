export const getConfig = (querySearch) => ({
    input: {
        prop: 'inputValue',
        placeholder:'我是输入框',
        style: {},
    },
    autocomplete: {
        prop: 'autocompleteValue',
        placeholder: '请输入内容',
        fetchSuggestions: querySearch
    },
    mySelect: {
        prop: 'selectValue',
        placeholder: '请选择',
        list: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
        }]
    },
    switch: {
        prop: 'switchValue',
        activeColor: "#13ce66",
        inactiveColor: "#ff4949"
    },
    rate: {
        prop: 'rateValue'
    },
    restaurants: []
})