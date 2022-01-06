const TARGET_FOLDER = "/home/cris/work/playground/patches-analysis";
const fs = require("fs");

const esprima = require("esprima");       // parsing code into tree
const estraverse = require("estraverse"); // processing the tree
const escodegen = require("escodegen");   // generating code from tree

let entries = fs.readdirSync(TARGET_FOLDER);
for (let i = 0; i < entries.length; i++) {
    try {
        let targetExpFolder = TARGET_FOLDER + "/" + entries[i]
        let entriesFld = fs.readdirSync(targetExpFolder);
        for (let j = 0; j < entriesFld.length; j++) 
            if (entriesFld[j] != "package.json") {
                let targetFile = targetExpFolder + "/" + entriesFld[j];
                // fs.unlinkSync(targetFile.replace(".test.js", "v1.test.js"))
                let modified = process(fs.readFileSync(targetFile).toString());
                fs.writeFileSync(targetFile.replace(".test.js", "v2.test.js"), modified);
            }
    } catch(e) {

    }

}
//let code = fs.readFileSync("/home/cris/work/vulnerabilities4js/prototype-pollution/bodymen_1.0.0/bodymen.test.js").toString();

function process(code) {
    // parse
    let ast = esprima.parse(code);

    // process
    estraverse.replace(ast, {
        enter: function (node, parent) {        
            // if (node.type === 'Literal' && node.value === "__proto__" && parent.type !== "ArrayExpression") {            
            //     return esprima.parse("['__proto__']").body[0].expression;
            // }
            if (node.type === 'Literal' && node.value === "__proto__.polluted" && parent.type !== "ArrayExpression") {            
                node.value = "constructor.prototype.polluted";
            }
            // if (node.type === 'Literal' && node.value === `{"__proto__":{"polluted":"yes"}}` && parent.type !== "ArrayExpression") {            
            //     node.value = '{"constructor": {"prototype": {"polluted": "yes"}}}';
            // }            
        }
    });

    // generate
    return escodegen.generate(ast);
}