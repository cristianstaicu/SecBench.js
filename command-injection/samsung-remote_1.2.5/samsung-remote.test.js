test("Command Injection in samsung-remote", (done) => {
  expect.assertions(2);
  const SamsungRemote = require("samsung-remote");
  const fs = require("fs");
  const path = "./samsung-remote";
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
  var remote = new SamsungRemote({ ip: "127.0.0.1; touch samsung-remote;" });
  remote.isAlive(function (err) {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
