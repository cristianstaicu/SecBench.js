//checking that its not present already
test("Command Injection in gry", (done) => {
  expect.assertions(2);
  const Repo = require("gry");
  const fs = require("fs");
  const path = "./gry";
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
  let myRepo = new Repo(".");
  myRepo.pull("test; touch gry; #", function () {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
