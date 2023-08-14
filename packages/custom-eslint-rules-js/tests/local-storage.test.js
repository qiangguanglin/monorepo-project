const RuleTester = require("eslint").RuleTester;
const rule = require("../lib/rules/local-storage");

const tester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
});

tester.run("local-storage", rule, {
  valid: [`try { localStorage.setItem('a', '123') } catch (e) {}`],
  invalid: [
    {
      code: `localStorage.setItem('a', '123')`,
      errors: [
        {
          messageId: "noCatchError",
        },
      ],
    },
  ],
});
