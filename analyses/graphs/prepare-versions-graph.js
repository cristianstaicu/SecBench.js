const fs = require("fs");
let versions = JSON.parse(fs.readFileSync("./all-versions.json"));
let res = ""
let pkgs = Object.keys(versions);
pkgs.sort((a, b) => {
    return versions[a].length - versions[b].length;
});
pkgs.forEach((a) => {
    res += (`${a},${versions[a].length},${0}\n`);})
fs.writeFileSync("./vuln-versions.csv", res);