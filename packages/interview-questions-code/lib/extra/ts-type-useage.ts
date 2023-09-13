// ts的infer推断关键字
/**
 * @abstract ts中extends的作用有两个
 * 1.在定义泛型时，用于约束泛型的类型，例如
 * function getLength<T extends Array<any>>(arr:T): number {
 *  return arr.length;
 * }
 * 在这个例子中，T extends Array<any> 表示泛型 T 必须是 Array<any> 或其子类型。
 *
 * 2.在条件类型中，extends用于创建基于类型的条件表达式。例如：
 * type IsString<T> = T extends string ? true : false;
 * 在这个例子中，IsString<T> 是一个条件类型，如果 T 是 string 类型或其子类型，那么 IsString<T> 的类型就是 true，否则就是 false。
 *  */

/**
 * @abstract 这是一个条件类型，如果T是函数，那么根据infer推断T的返回值，从而在条件类型中返回R，否则返回any
 * @param T 表示是一个泛型，后面通过extends关键字判断T是否为函数类型
 * @param R 是通过infer关键字推断出来的函数返回值
 */
type FnReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type Func = () => number;

type Num = FnReturnType<Func>; // Num的类型是number
