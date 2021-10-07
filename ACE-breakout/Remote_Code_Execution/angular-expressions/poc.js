var expressions = require("angular-expressions");
x = console.log;
evaluate = expressions.compile(`console.log('hey')`);
evaluate()
