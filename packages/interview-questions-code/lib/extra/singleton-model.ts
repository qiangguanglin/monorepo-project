interface ClassType {
  new (...args: unknown[]): any;
}

/**
 * 一个类的例子
 */
class MyVideo {
  a: unknown;
  b: unknown;
  constructor(a: unknown, b: unknown) {
    this.a = a;
    this.b = b;
  }
}

// 判断两个参数是否一致
function isSame(value1: string | unknown[], value2: string | unknown[]) {
  if (value1.length !== value2.length) {
    return false;
  }
  for (let i = 0; i < value1.length; i++) {
    if (value1[i] !== value2[i]) {
      return false;
    }
  }
  return true;
}

// 使用proxy拦截类的构造函数，使用自己的逻辑
function singleton(className: ClassType) {
  let ins: typeof className;
  let parameters: unknown[];
  return new Proxy(className, {
    /**
     * new操作符捕捉器
     * @param target 被代理的原始类
     * @param args 构造函数入参
     * @returns
     */
    construct(target: ClassType, args) {
      if (!ins) {
        ins = new target(...args);
        parameters = args;
      }
      if (!isSame(parameters, args)) {
        throw new Error("singleton class can only be constructed once");
      }
      return ins;
    },
  });
}

const tempVideo = singleton(MyVideo); // 创建单例

const v1 = new tempVideo(1, 2); // new一个实例
const v2 = new tempVideo(1, 2); // 再new一个实例
// const v3 = new tempVideo(3, 4); // 会报错，因为单例只允许new一次，不同的参数会报错
// const v4 = new tempVideo(); // 会报错，因为单例只允许new一次，不同的参数会报错
console.log(v1 === v2); // true，因为两个实例是一个地址
