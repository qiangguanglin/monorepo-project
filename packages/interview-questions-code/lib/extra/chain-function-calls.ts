// 定义main函数返回的对象类型
interface Main {
  entry: (desc: string) => Main;
  wait: (second: number) => Main;
  do: (something: string) => Main;
  exit: () => Promise<void>;
}

// 主函数
// 每个内部函数返回this是因为，函数内的this指向是根据函数调用方式决定的，前面main函数返回的是一个对象，所以每个子函数的this就指向这个对象
// ts中可以将第一个参数作为this的类型，不可以放在其他位置，否则会当做参数处理
function main(): Main {
  // 用于存放任务队列
  let tasks: Array<() => void | Promise<void>> = [];

  function entry(this: Main, desc: string) {
    tasks.push(() => {
      console.log(`${desc}提示`);
    });
    return this;
  }

  function wait(this: Main, second: number) {
    tasks.push(() => {
      return new Promise((resolve) => {
        console.log(`等待${second}秒`);
        setTimeout(() => {
          resolve();
        }, second * 1000);
      });
    });
    return this;
  }

  function doSomething(this: Main, something: string) {
    tasks.push(() => {
      console.log(`执行${something}`);
    });
    return this;
  }
  // 使用promise的then实现链式调用
  async function exit(this: Main) {
    let promise = Promise.resolve();
    tasks.forEach((task) => {
      promise = promise.then(task);
    });
    tasks = [];
    await promise;
    console.log("退出程序");
    return;
  }

  return {
    entry,
    wait,
    do: doSomething,
    exit,
  };
}

main().entry("进入函数").exit();
main().entry("进入函数").wait(5).exit();
main().entry("进入函数").wait(5).do("小明").exit();
main().entry("进入函数").exit();
