var evaluate = require('static-eval');
var parse = require('esprima').parse;
var src = '(function(){console.log(process.pid)}())';
var ast = parse(src).body[0].expression;
var res = evaluate(ast, {});

