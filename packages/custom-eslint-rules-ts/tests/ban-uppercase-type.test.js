const rule = require("../lib/rules/ban-uppercase-type")
const utils = require('@typescript-eslint/utils')
const ESLintUtils = utils.ESLintUtils
const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run("ban-uppercase-type", rule, {

    valid: [
      'type a = string | number | {} | boolean | (() => void) | symbol',
      'type a = string & number & {} & boolean & (() => void) & symbol',
      `
        interface a {
          b: string,
          c: number,
          d: {},
          e: boolean,
          f: () => void
          g: symbol
        }
      `,
      'const a:string = "1"',
      'const a: {} = {}',
      'function exit(): Array<boolean> {}',
      'function exit(callback: () => void) { callback() }',
      'function exit():symbol { const foo: symbol = Symbol();return foo}',
      'class Foo<F = string> extends Bar {}',
      'class Foo extends Bar<number> {}',
    ],

    invalid: [
      {
        code: 'class Foo<F = String> extends Bar {}',
        errors: [{
            message: "不允许使用 String 类型，请使用 string 替代", // 与rule抛出的错误保持一致
        }]
      },
      {
        code: 'class Foo extends Bar<Number> {}',
        errors: [{
            message: "不允许使用 Number 类型，请使用 number 替代",
        }]
      },
      {
        code: 'const a: Object = {}',
        errors: [{
            message: "不允许使用 Object 类型，请使用 {} 替代",
        }]
      },
      {
        code: 'function exit(): Array<Boolean> {}',
        errors: [{
            message: "不允许使用 Boolean 类型，请使用 boolean 替代",
        }]
      },
      {
        code: 'function exit(callback: Function) { callback() }',
        errors: [{
            message: "不允许使用 Function 类型，请使用 () => void 替代",
        }]
      },
      {
        code: 'function exit() { const foo: Symbol = Symbol("wuhao92")}',
        errors: [{
            message: "不允许使用 Symbol 类型，请使用 symbol 替代",
        }]
      }
    ]
});


