const PENDING = "pending";
const REJECTED = "rejected";
const FULFILLED = "fulfilled";

/**
 * 产生微任务函数
 * @param {Function} callback
 */
function runMicroTask(callback) {
  // 判断node环境
  // 为了避免「变量未定义」的错误，这里最好加上前缀globalThis
  // globalThis是一个关键字，指代全局对象，浏览器环境为window，node环境为global
  if (globalThis.process && globalThis.process.nextTick) {
    process.nextTick(callback);
  } else if (globalThis.MutationObserver) {
    const p = document.createElement('p');
    const observer = new MutationObserver(callback);
    observer.observe(p, {
      childList: true, // 观察该元素内部的变化
    });
    p.innerHTML = '1';
  } else {
    setTimeout(callback, 0);
  }
}

/**
 * 判断是不是一个promise
 * @param {*} obj 
 * @returns 
 */
function isPromise(obj) {
    return !!(obj && typeof obj === "object" && typeof obj.then === "function")
}

class MyPromise {
  /**
   * 创建一个promise
   * @param {Function} executor 表示任务执行器
   */
  constructor(executor) {
    this._state = PENDING; // 初始化状态是pending
    this._value = undefined; // 初始化数据是undefined
    this._handlers = []; // 处理函数生成的队列
    // try catch报错是为了执行的时候报错，其实是走到reject状态
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (e) {
      this._reject(e);
      console.error(e);
    }
  }
  /**
   * 向处理队列中添加函数
   * @param {*} executor 添加的函数
   * @param {*} state 函数对应状态
   * @param {*} resolve 让then函数对应的promise返回成功
   * @param {*} state 让then函数对应的promise返回失败
   *
   */
  _pushHandler(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject,
    });
  }
  /**
   * 根据情况，执行队列
   */
  _runHandlers() {
    if (this._state === PENDING) {
      // 目前任务仍在挂起
      return;
    }
    while (this._handlers[0]) {
      const handler = this._handlers[0];
      this._runOneHandler(handler);
      this._handlers.shift();
    }
  }
  /**
   * 运行一个handler
   * @param {Function} handler
   */
  _runOneHandler({executor, state, resolve, reject}) {
    // console.log(reject);
    
    runMicroTask(() => {
      if (this._state !== state) {
        // 状态不一致，不执行
        return;
      }
      if (typeof executor !== "function") {
        // 后续处理并非一个函数
        this._state === FULFILLED
          ? resolve(this._value)
          : reject(this._value);
        return;
      }
      try {
        const result = executor(this._value)
        if(isPromise(result)) {
            result.then(resolve, reject)
        } else {
            resolve(result)
        }
      } catch(error) {
        reject(error)
        console.error(error);
      }
    });
  }
  
  /**
   * Promise A+规范的then
   * @param {Function} onFulfilled
   * @param {Function} onRejected
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandler(onRejected, REJECTED, resolve, reject);
      this._runHandlers(); //执行队列
    });
  }

  /**
   * 仅处理失败的场景
   * @param {Function} onRejected
   */
  catch(onRejected) {
    this.then(null, onRejected)
  }

  /**
   * 无论成功还是失败都会执行回调
   * @param {Function} onSettled
   */
  finally(onSettled) {
    return this.then((data) => {
      onSettled()
      return data
    }, (reason) => {
      onSettled()
      throw reason
    })
  }

  /**
   *
   * @param {String} state 状态
   * @param {any} value 数据
   */
  _changeState(state, value) {
    // 如果当前状态已经改变了，那么就不能再改变
    if (this._state !== PENDING) {
      return;
    }
    // 下面这个判断是为了处理value为Promise的情况
    // 这一段代码课程中没有涉及，特此注释说明
    if (isPromise(value)) {
      value.then(this._resolve.bind(this), this._reject.bind(this));
      return;
    }
    this._state = state;
    this._value = value;
    this._runHandlers(); // 状态变化执行
  }
  /**
   * 标记当前任务完成
   * @param {any} data 任务完成数据
   */
  _resolve(data) {
    this._changeState(FULFILLED, data);
  }
  /**
   * 标记当前任务失败
   * @param {any} reason 任务失败数据
   */
  _reject(reason) {
    this._changeState(REJECTED, reason);
  }
  /**
   * 返回一个已完成的Promise
   * 特殊情况：
   * 1. 传递的data本身就是ES6的Promise对象
   * 2. 传递的data是PromiseLike（Promise A+），返回新的Promise，状态和其保持一致即可
   * @param {any} data
   */
  static resolve(data) {
    if(data instanceof MyPromise) {
      return data
    }
    return new MyPromise((resolve, reject) => {
      if(isPromise(data)) {
        data.then(resolve, reject)
      } else {
        resolve(data)
      }
    })
  }
  /**
   * 得到一个被拒绝的Promise
   * @param {any}} reason
   */
  static reject(reason) {
    return new MyPromise((_,reject) => {
      reject(reason)
    })
  }
  /**
   * 得到一个新的Promise
   * 该Promise的状态取决于proms的执行
   * proms是一个迭代器，包含多个Promise
   * 全部Promise成功，则返回的Promise成功，数据为所有Promise成功的数据，并且顺序是按照传入的顺序排列
   * 只要有一个Promise失败，则返回的Promise失败，原因是第一个失败的Promise的原因
   * @param {iterator} proms
   */
  static all(proms) {
    return new MyPromise((resolve, reject) => {
      try {
        const results = []
        let count = 0 // Promise的计数
        let fulfilledCount = 0 // Promise已完成的数量
        for(const p of proms) {
          let i = count
          count++
          MyPromise.resolve(p).then((data) => {
            fulfilledCount++
            results[i] = data
            if(fulfilledCount === count) {
              // 当前是最后一个Promise完成了
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
  /**
   * 等待所有的Promise有结果之后
   * 该方法返回的Promise完成
   * 并且按照顺序将所有结果汇总
   * @param {iterator} proms 
   */
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
    return MyPromise.all(ps)
  }
  /**
   * 返回的Promise与第一个有结果的一致
   * @param {iterator} proms
   */
  static race(proms) {
    return new MyPromise((resolve, reject) => {
      for(const p of proms) {
        MyPromise.resolve(p).then(resolve, reject)
      }
    })
  }
}
// const promise1 = new MyPromise((resolve, reject) => {
//   resolve(1)
// }).then((v) => {
//   // throw new Error(1)
// })
// console.log(promise1)
const promise2 = new Promise((resolve, reject) => {
  resolve(1)
}).then((v) => {
  throw new Error(1)
  console.log(v)
}).catch(e => {})
console.log(promise2)

// const pro1 = new MyPromise((resolve, reject) => {
//     resolve(1)
// })

// pro1.then(data => {
//     console.log(data)
//     return new Promise((resolve) => {
//         resolve(2)
//     })
// }).then((data) => {
//     console.log(data);
// })


// const pro = MyPromise.resolve(new MyPromise((resolve, reject) => {
//   resolve(1)
// }))

// console.log(pro)
// const pro1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 100)
// })
// MyPromise.all([pro1, MyPromise.resolve(2), MyPromise.resolve(3), 4]).then(data => {
//   console.log(data);
  
// }, (reason) => {

// })

// allSettled
// const pro1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000)
// })
// const pro = Promise.allSettled([pro1, MyPromise.resolve(2), MyPromise.resolve(3), 4]).then(data => {
//   console.log(data);
// })

// race
// const pro1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject(1)
//   }, 1000)
// })
// const pro2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2)
//   }, 500)
// })
// MyPromise.race([pro1, pro2]).then(data => {
//   console.log('成功', data);
// }, (reason) => {
//   console.log('失败', reason);
// })