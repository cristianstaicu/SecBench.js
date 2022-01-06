const fs = require("fs");
const esprima = require("esprima");       // parsing code into tree
const estraverse = require("estraverse"); // processing the tree
const escodegen = require("escodegen");   // generating code from tree

let code = fs.readFileSync("/home/cris/work/vulnerabilities4js/prototype-pollution/bodymen_1.0.0/bodymen.test.js").toString();
// parse
let ast = esprima.parse(code);

// process
estraverse.replace(ast, {
    enter: function (node, parent) {        
        if (node.type === 'Literal' && node.value === "__proto__" && parent.type !== "ArrayExpression") {            
            return esprima.parse("['__proto__']").body[0].expression;
        }
    }
});

// generate
console.log(escodegen.generate(ast));

