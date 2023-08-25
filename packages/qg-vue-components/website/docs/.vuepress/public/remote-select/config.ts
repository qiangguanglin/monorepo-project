import { Options } from '@/types/config'

const total = 200;
export const originData: {
    list: Options[],
    total: number
} = {
    list: (() => {
        let res = []
        for(let i=0; i<total; i++){
            res.push({value: i+1, label: `选项${i+1}`})
        }
        return res
    })(),
    total
}