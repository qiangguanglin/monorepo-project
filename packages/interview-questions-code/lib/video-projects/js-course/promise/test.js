const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

runMicroTask = (callback) => {
    if(process && process.nexTick) {
        process.nextTick(callback)
    } else if(MutationObserver) {
        const p = document.createElement('p')
        const observer = new MutationObserver(callback)
        observer.observe(p, {
            childList: true,
        })
        p.innerHTML = '1'
    } else {
        setTimeout(callback, 0)
    }
}
isPromise = (obj) => {
    return obj && typeof obj === 'object' && typeof obj.then === 'function'
}
class MyPromise {
    constructor(executor) {
        this._state = PENDING
        this._value = undefined
        this._handlers = []
        try {
            executor(this._resolve.bind(this), this._reject.bind(this)) 
        } catch(e) {
            this._reject(e)
            console.error(e)
        }
    }

    _changeState(value, state) {
        if(this._state !== PENDING) {
            return
        }
        this._state = state
        this._value = value
    }

    _resolve(value) {
        this._changeState(value, FULFILLED)
    }

    _reject(value) {
        this._changeState(value, REJECTED)
    }

    _pushHandler(executor, state, resolve, reject) {
        this._handlers.push({
            executor,
            state,
            resolve,
            reject
        })
    }

    _runOneHandler({executor, state, resolve, reject}) {
        runMicroTask() {
            if(this._state !== state) {
                return
            }
            if(typeof executor !== 'function') {
                this._state === FULFILLED ? resolve(this._value) : reject(this._value)
                return
            }
            try {
                const result = executor(this._value)
                if(isPromise(result)) {
                    result.then(resolve, reject)
                } else {
                    resolve(result)  
                }
            } catch(e) {
                reject(e)
                console.error(e)
            }
        }
    }

    _runHandlers() {
        if(this._state === PENDING) {
            return
        }
        while(this._handlers[0]) {
            const handler = this._handlers[0]
            this._runOneHandler(handler)
            this._handlers.shift()
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this._pushHandler(onFulfilled, FULFILLED, resolve, reject)
            this._pushHandler(onRejected, REJECTED, resolve, reject)
            this._runHandlers()
        })
    }

    static resolve(data) {
        if(data instanceof MyPromise) {
            return data
        }
        return new Promise((resolve, reject) => {
            if(isPromise(data)) {
                data.then(resolve, reject)
            } else {
                resolve(data)
            }
        })
    }

    static reject(data) {
        return new Promise((_, reject) => {
            reject(data)
        })
    }

    catch(onRejected) {
        this.then(null, onRejected)
    }

    static all(proms) {
        return new MyPromise((resolve, reject) => {
            try {
                const results = []
                let count = 0
                let fulfilledCount = 0
                for(let p of proms) {
                    let i = count
                    count++
                    MyPromise.resolve(p).then(data => {
                        fulfilledCount++
                        results[i] = data
                        if(fulfilledCount === count) {
                            resolve(results)
                        }
                    }, reject)
                }
                if(count === 0) {
                    resolve(results)
                }
            } catch(e) {
                reject(e)
                console.error(e)
            }
        })
    }

    static allSettled(proms) {
        const ps = []
        for(const p of proms) {
            ps.push(MyPromise.resolve(p).then(value => ({
                status: FULFILLED,
                value
            }), reason => ({
                status: REJECTED,
                reason
            })))
        }
        return Promise.all(ps)
    }

    static race() {
        return new Promise((resolve, reject) => {
            for(const p of proms) {
                MyPromise.resolve(p).then(resolve, reject)
            }
        })
    }

    finally(onSettled) {
        return this.then((data) => {
            onSettled()
            return data
        }, reason => {
            onSettled()
            throw reason
        })
    }
}