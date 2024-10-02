/**
 * 防抖函数
 * @param {*} fn 传入的执行函数
 * @param {*} wait 传入的延迟时间
 */
export function debounce(fn, wait) {
  let timeId = null;
  return function (...args) {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}

/**
 * 节流，时间戳法
 * @param {*} fn 传入的执行函数
 * @param {*} wait 传入的延迟时间
 */
export function throttleByTimestamp(fn, wait) {
  let pre = 0;
  return function (...args) {
    const now = Date.now()
    if(now - pre > wait) {
      fn(...args)
      pre = now
    }
  };
}

/**
 * 节流，定时器法
 * @param {*} fn 传入的函数
 * @param {*} wait 传入的延迟时间
 */
export function throttleByTimer(fn, wait) {
  let timeId = null
  return function(...args) {
    if(!timeId) {
      fn(...args)
      timeId = setTimeout(function() {
        timeId = null
      }, wait)
    }
  }
}