var quote = require('shell-quote').quote;
var exec = require('child_process').exec;

var userInput = 'a;{touch aaa.sh}';

var safeCommand = quote(['echo', userInput]);

exec(safeCommand, function (err, stdout, stderr) {
  console.log(stdout);
});