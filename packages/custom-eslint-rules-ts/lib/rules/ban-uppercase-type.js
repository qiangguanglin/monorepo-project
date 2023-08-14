module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "禁止使用String、Number、Object、Boolean、Function、Symbol作为TS类型",
        category: "problem",
        recommended: false
      },
      fixable: false,
      schema: []
    },

    create: function(context) {
        const invalidTypes = [
            "String",
            "Number",
            "Object",
            "Boolean",
            "Function",
            "Symbol"
        ];

        const validTypes = {
            "String": "string",
            "Number": "number",
            "Object": "{}",
            "Boolean": "boolean",
            "Function": "() => void",
            "Symbol": "symbol"
        };

        return {
            TSTypeReference(node) {
                const typeName = node.typeName.name
                if (invalidTypes.includes(typeName)) {
                  context.report({
                    node,
                    message: `不允许使用 ${typeName} 类型，请使用 ${validTypes[typeName]} 替代`,
                  })
                }
            }
        };
    }
};
