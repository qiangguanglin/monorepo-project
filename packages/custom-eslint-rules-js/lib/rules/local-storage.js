module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "localStorage.setItem 必须写在try..catch 中",
    },
    messages: {
      noCatchError: "localStorage.setItem shuold use in try..catch 中",
    },
    schema: [],
    fixable: false,
  },
  create: function (context) {
    return {
      "CallExpression[callee.object.name='localStorage'][callee.property.name='setItem']":
        function (node) {
          try {
            const ancestors = context.getAncestors() || [];
            for (let i = ancestors.length - 1; i >= 0; i--) {
              if (ancestors[i].type === "TryStatement") {
                return;
              }
            }

            context.report({
              node,
              messageId: "noCatchError",
            });
          } catch (error) {}
        },
    };
  },
};
