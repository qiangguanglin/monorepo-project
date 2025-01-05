
const PENDING = 'pending';
const REJECTED = 'rejected';
const FULfilled = 'fulfilled';
class MyPromise {
    /**
     * 创建一个promise
     * @param {Function} executor 表示任务执行器
     */
    constructor(executor) {
        this._state = PENDING // 初始化状态是pending
        this._value = undefined // 初始化数据是undefined
        // try catch报错是为了执行的时候报错，其实是走到reject状态
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch(e) {
            this._reject(e)
        }
    }
    /**
     * 
     * @param {String} state 状态
     * @param {any} value 数据
     */
    _changeState(state, value) {
        // 如果当前状态已经改变了，那么就不能再改变
        if(this._state !== PENDING) {
            return
        }
        this._state = state
        this._value = value
    }
    /**
     * 标记当前任务完成
     * @param {any} data 任务完成数据
     */
    _resolve(data) {
        this._changeState(FULfilled, data)
    }
    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败数据
     */
    _reject(reason) {
        this._changeState(REJECTED, reason)
    }

}

const pro = new MyPromise((resolve, reject) => {
    throw new Error(1)
})

console.log(pro)