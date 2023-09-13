// 装饰器需要将tsconfig的experimentalDecorators设置为true
// 装饰器必须用在class上

// 类装饰器
const addSex = (sex?: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.sex = sex || "未知";
  };
};

interface P {
  name: string;
  age: number;
  sex?: string;
}

@addSex("男")
class Person {
  name: string = "";
  age: number = 0;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const p: P = new Person("张三", 18);
console.log("p: ", p);

// 方法装饰器
const logResult = (param: string = "") => {
  /**
   * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
   * @param propertyKey 成员的名字。
   * @param descriptor 成员的属性描述符
   */
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;
    descriptor.value = function (...rest) {
      const result = fn.apply(this, rest);
      console.log(propertyKey + "：" + param + result);
      return result;
    };
  };
};

class MyPerson {
  name: string = "";
  age: number = 0;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  @logResult("test")
  getName() {
    return this.name;
  }
}

const q = new MyPerson("张三", 18);
q.getName(); // getName：张三

// 参数装饰器
/**
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param propertyKey 方法名
 * @param paramIndex 参数所在位置的索引
 */
const paramDecorator = (
  target: any,
  propertyKey: string,
  paramIndex: number
) => {
  console.log(target, propertyKey, paramIndex);
};

class YourPerson {
  name: string = "";
  age: number = 0;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  setName(@paramDecorator name: string) {
    this.name = name;
  }
}

const r = new YourPerson("张三", 18); // Person、setName、0
r.setName("李四");

// 属性装饰器
/**
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param propertyKey 成员的名字
 */
const propertyName = (target: any, propertyKey: string) => {
  console.log(target, propertyKey);
};

class MePerson {
  @propertyName // Person, name
  name: string = "";
  age: number = 0;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const s = new MePerson("张三", 18);

// 访问器装饰器
/**
 *
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * @param propertyKey 方法名。
 * @param descriptor 属性描述符。
 */
const getSetDecorator = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  console.log(target, propertyKey, descriptor);
};

class YPerson {
  private _name: string = "";
  private _age: number = 0;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  @getSetDecorator
  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}

const t = new YPerson("张三", 18);
